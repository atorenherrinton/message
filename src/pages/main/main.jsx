/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setName,
  setLanguage,
  selectEmail,
} from "../../slices/authenticate";
import { selectIsAddingFriend } from "../../slices/communicate";
import AddFriend from "../../components/add/add-friend";
import Chat from "../../components/chat/chat";
import Contacts from "../../components/contacts/contacts";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/header/header";
import FriendRequests from "../../components/friend-requests/friend-requests";

import firebase from "../../firebase/firebase";

const Main = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const db = firebase.firestore();
  const myRef = db.collection("users").doc(email);
  const isAddingFriend = useSelector(selectIsAddingFriend);

  useEffect(() => {
    myRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(setName(doc.data().name));
          dispatch(setLanguage(doc.data().language));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <Grid container direction="row" justify="space-between">
        <Grid item xs={12} md={3}>
          <Contacts />
        </Grid>
        <Grid item xs={12} md={4}>
          {isAddingFriend ? <AddFriend /> : <Chat />}
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <FriendRequests />
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
