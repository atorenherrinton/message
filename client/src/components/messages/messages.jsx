/** @format */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectMyEmail } from "../../slices/authenticate";
import { selectOtherEmail } from "../../slices/communicate";
import Message from "../message/message";

import firebase from "../../firebase/firebase";

const Messages = () => {
  const myEmail = useSelector(selectMyEmail);
  const otherEmail = useSelector(selectOtherEmail);
  const [messages, setMessages] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    const loadMessages = () => {
      db.collection("users")
        .doc(myEmail)
        .collection("friends")
        .doc(otherEmail)
        .collection("conversation")
        .onSnapshot((querySnapshot) => {
          const temp = [];
          querySnapshot.forEach((doc) => {
            temp.push(doc.data());
          });
          setMessages(temp);
        });
    };
    loadMessages();
  }, [db, myEmail, otherEmail]);

  return (
    <div>
      {messages.map((message, idx) => (
        <Message
          key={idx}
          isFriend={message.email === otherEmail}
          text={message.message}
        />
      ))}
    </div>
  );
};

export default Messages;
