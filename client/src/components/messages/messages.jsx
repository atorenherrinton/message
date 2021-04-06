/** @format */
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMyEmail } from "../../slices/authenticate";
import {
  setScrollToLast,
  setMessages,
  selectMessages,
  selectOtherEmail,
  selectScrollToLast,
} from "../../slices/communicate";
import PropTypes from "prop-types";
import Message from "../message/message";
import { VariableSizeList } from "react-window";

import firebase from "../../firebase/firebase";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 350,
  },
}));

const Messages = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myEmail = useSelector(selectMyEmail);
  const otherEmail = useSelector(selectOtherEmail);
  const messages = useSelector(selectMessages);
  const scrollToLast = useSelector(selectScrollToLast);
  const listRef = useRef(null);
  if (scrollToLast) {
    listRef.current.scrollToItem(messages.length - 1);
    dispatch(setScrollToLast());
  }

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
    const messageLength = messages[index].message.length;
    const lineHeight = 35;
    const division = Math.ceil(messageLength / lineLength);
    const result = division * lineHeight;
    if (division > 1) {
      console.log(result - 26);
      return result - 26;
    } else {
      console.log(result);
      return result;
    }
  };

  const loadMessages = () => {
    const db = firebase.firestore();
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
        dispatch(setMessages(temp));
      });
  };

  useEffect(() => {
    loadMessages();
  });

  return (
    <div className={classes.root}>
      <VariableSizeList
        height={350}
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
