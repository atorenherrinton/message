/** @format */
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectMyEmail } from "../../slices/authenticate";
import { selectOtherEmail } from "../../slices/communicate";
import PropTypes from "prop-types";
import Message from "../message/message";
import { VariableSizeList } from "react-window";

import firebase from "../../firebase/firebase";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 250,
  },
}));

const Messages = () => {
  const classes = useStyles();
  const myEmail = useSelector(selectMyEmail);
  const otherEmail = useSelector(selectOtherEmail);
  const [messages, setMessages] = useState([]);
  const db = firebase.firestore();
  const listRef = useRef(null);

  const renderRow = (props) => {
    const { index, style } = props;
    return (
      <div style={style}>
        <Message
          key={index}
          isFriend={messages[index].email === otherEmail}
          text={messages[index].message}
        />
      </div>
    );
  };

  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  const getItemSize = (index) => {
    const lineLength = 63;
    let messageLength = 1;
    if (messages[index]) {
      messageLength = messages[index].message.length;
    }
    const baseHeight = 35;
    const additionalLine = 20;
    let division = Math.round(messageLength / lineLength);
    if (division < 1) {
      return baseHeight;
    } else {
      // base height is 35px and 20px for each line
      return baseHeight + (division - 1) * additionalLine;
    }
  };

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
          listRef.current.scrollToItem(messages.length - 1);
        });
    };
    loadMessages();
  }, [db, messages.length, myEmail, otherEmail]);

  return (
    <div className={classes.root}>
      <VariableSizeList
        height={250}
        width="100%"
        itemSize={getItemSize}
        itemCount={messages.length}
        ref={listRef}
      >
        {renderRow}
      </VariableSizeList>
    </div>
  );
};

export default Messages;
