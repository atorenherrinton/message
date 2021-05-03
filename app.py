from datetime import datetime
from flask import Flask, request, send_from_directory
import firebase_admin
from firebase_admin import auth
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud import translate_v2 as translate
import html
from html.parser import HTMLParser
import os
from pytz import timezone
import pytz
import six

app = Flask(__name__, static_folder='client/build', static_url_path='')
app.debug = True

credential_path = "sdk/message-fe49a-36501c6d489f.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path

# Use a service account
cred = credentials.Certificate(
    'sdk/message-fe49a-5407f44e1c08.json')
default_app = firebase_admin.initialize_app(cred)

db = firestore.client()


def accept_friend_request():
    my_email, other_email = request.json['my_email'], request.json['other_email']
    my_ref = db.collection(u'users').document(my_email)
    other_ref = db.collection(u'users').document(other_email)
    my_doc = my_ref.get()
    other_doc = other_ref.get()

    if my_doc.exists and other_doc.exists:
        my_name = my_doc.to_dict()['name']
        my_language = my_doc.to_dict()['language']

        other_name = other_doc.to_dict()['name']
        other_language = other_doc.to_dict()['language']

        other_ref.collection(u'friends').document(my_email).set({
            u'name': my_name,
            u'language': my_language,
            u'email': my_email
        })
        my_ref.collection(u'friends').document(other_email).set({
            u'name': other_name,
            u'language': other_language,
            u'email': other_email
        })
        return 'friend request accepted and ' + delete_friend_request()
    else:
        return 'internal error'


def add_user_to_database():
    my_email, my_name, my_language = request.json[
        'my_email'], request.json['my_name'], request.json['my_language']
    db.collection(u'users').document(my_email).set({
        u'name': my_name,
        u'language': my_language,
    })
    return 'successfully added user to database'


def delete_collection(coll_ref):
    docs = coll_ref.stream()
    deleted = 0

    for doc in docs:
        print(f'Deleting doc {doc.id} => {doc.to_dict()}')
        doc.reference.delete()
        deleted = deleted + 1
    return f'{deleted} documents were deleted'


def delete_conversation():
    my_email, other_email = request.json['my_email'], request.json['other_email']
    my_ref = db.collection(u'users').document(my_email).collection(
        u'friends').document(other_email)
    my_conversation = my_ref.collection(u'conversation')
    deleted_conversation = delete_collection(my_conversation)

    my_doc = my_ref.get()

    if my_doc.exists:
        my_ref.update({
            u'lastMessage': firestore.DELETE_FIELD
        })
        return 'messages: ' + deleted_conversation


def delete_friend_request():
    my_email, other_email = request.json['my_email'], request.json['other_email']
    my_ref = db.collection(u'users').document(my_email).collection(
        u'friend-requests').document(other_email)
    other_ref = db.collection(u'users').document(
        other_email).collection(u'friend-requests').document(my_email)
    my_doc = my_ref.get()
    other_doc = other_ref.get()

    if my_doc.exists:
        my_ref.delete()
        if other_doc.exists:
            other_ref.delete()
        return 'request object was deleted'


def load_messages():
    my_email, other_email = request.json['my_email'], request.json['other_email']
    my_docs = db.collection(u'users').document(my_email).collection(
        u'friends').document(other_email).collection(u'conversation').stream()
    conversation = []
    for doc in my_docs:
        conversation.append(doc.to_dict())
    return conversation


def send_friend_request():
    my_email, other_email = request.json['my_email'], request.json['other_email']
    my_ref = db.collection(u'users').document(my_email)
    other_ref = db.collection(u'users').document(other_email)

    my_doc = my_ref.get()
    other_doc = other_ref.get()

    if other_doc.exists:
        my_name = my_doc.to_dict()['name']
        my_language = my_doc.to_dict()['language']
        other_ref.collection(u'friend-requests').document(my_email).set({
            u'name': my_name,
            u'language': my_language,
            u'email': my_email
        })
        return 'successfully sent friend request'

    else:
        # document.data() will be undefined in this case
        # Invite a friend via email
        return 'user was not found'


def send_message():
    my_email, other_email, message = request.json[
        'my_email'], request.json['other_email'], request.json['message']

    now = datetime.now(tz=pytz.utc)
    pst = now.astimezone(timezone('US/Pacific'))
    full_date = pst.strftime("%B %d %Y, %I:%M:%S %p")
    year, month, day, day_of_week = pst.strftime(
        "%Y %B %d %A").split(" ")
    time = pst.strftime("%H:%M:%S")
    date = {u'year': year, u'date': f'{month}, {day}',
            u'day_of_week': day_of_week, u'time': time}

    my_ref = db.collection(u'users').document(my_email)
    other_ref = db.collection(u'users').document(other_email)

    my_doc = my_ref.get()
    other_doc = other_ref.get()

    my_messages = my_ref.collection(
        u'friends').document(other_email).collection(u'conversation')
    other_messages = other_ref.collection(
        u'friends').document(my_email).collection(u'conversation')

    if my_doc.exists and other_doc.exists:
        other_language = other_doc.to_dict()[u'language']
        translated_message = translate_text(
            other_language, message)[u'translatedText']

        my_ref.collection(u'friends').document(other_email).update({
            u'lastMessage': message,
        })
        other_ref.collection(u'friends').document(my_email).update({
            u'lastMessage': translated_message,
        })

        my_messages.document(full_date).set(
            {u'message': message, u'email': my_email, u'date': date, u'full_date': full_date})
        other_messages.document(full_date).set(
            {u'message': translated_message, u'email': my_email, u'date': date, u'full_date': full_date})
        return 'message successfully sent'
    else:
        return 'internal error'


def translate_text(target, text):
    """Translates text into the target language.

    Target must be an ISO 639-1 language code.
    See https://g.co/cloud/translate/v2/translate-reference#supported_languages
    """

    translate_client = translate.Client()

    if isinstance(text, six.binary_type):
        text = text.decode("utf-8")

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    h = html.parser
    result = translate_client.translate(
        text, target_language=target)
    return h.unescape(result)


firebase_actions = {
    "accept_friend_request": accept_friend_request,
    "add_user_to_database": add_user_to_database,
    "delete_conversation": delete_conversation,
    "delete_friend_request": delete_friend_request,
    "load_messages": load_messages,
    "send_friend_request": send_friend_request,
    "send_message": send_message,
}


@ app.route('/firebase', methods=['POST'])
def firebase():
    action = request.json['action']
    return {'result': firebase_actions[action]()}


@ app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
