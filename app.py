from flask import Flask, request, send_from_directory
import firebase_admin
from firebase_admin import auth
from firebase_admin import credentials
from firebase_admin import firestore

app = Flask(__name__, static_folder='client/build', static_url_path='')
app.debug = True

# Use a service account
cred = credentials.Certificate('sdk/message-fe49a-35a0d495d2fc.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


def add_user_to_database():
    email, name, language = request.json['email'], request.json['name'], request.json['language']
    db.collection(u'users').document(email).set({
        u'name': name,
        u'language': language,
    })
    return 'successfully added user to database'


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


def get_friends():
    email = request.json['email']
    docs = db.collection(u'users').document(
        email).collection(u'friends').stream()
    result = [doc.to_dict() for doc in docs]
    return result


def get_friend_requests():
    email = request.json['email']
    docs = db.collection(u'users').document(
        email).collection(u'friend-requests').stream()
    result = [doc.to_dict() for doc in docs]
    return result


def accept_friend_request():
    my_email, other_email = request.json['my_email'], request.json['other_email']
    my_ref = db.collection(u'users').document(my_email)
    other_ref = db.collection(u'users').document(other_email)
    my_doc = my_ref.get()
    other_doc = other_ref.get()

    if my_doc.exists:
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


firebase_actions = {
    "add_user_to_database": add_user_to_database,
    "get_friends": get_friends,
    "get_friend_requests": get_friend_requests,
    "send_friend_request": send_friend_request,
    "accept_friend_request": accept_friend_request,
    "delete_friend_request": delete_friend_request,
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
