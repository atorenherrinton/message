/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMyName,
  setMyLanguage,
  selectMyEmail,
} from "../../slices/authenticate";
import {
  selectIsChatOpen,
  selectIsAddingFriend,
} from "../../slices/communicate";
import {
  setIsSnackbarOpen,
  selectIsSnackbarOpen,
  selectSnackbarMessage,
} from "../../slices/feedback";
import AddFriend from "../../components/add-friend/add-friend";
import Chat from "../../components/chat/chat";
import Contacts from "../../components/contacts/contacts";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/header/header";
import FriendRequests from "../../components/friend-requests/friend-requests";
import Snackbar from "@material-ui/core/Snackbar";

import firebase from "../../firebase/firebase";

const Main = () => {
  const dispatch = useDispatch();
  const myEmail = useSelector(selectMyEmail);
  const db = firebase.firestore();
  const myRef = db.collection("users").doc(myEmail);
  const isSnackbarOpen = useSelector(selectIsSnackbarOpen);
  const snackbarMessage = useSelector(selectSnackbarMessage);
  const isChatOpen = useSelector(selectIsChatOpen);
  const isAddingFriend = useSelector(selectIsAddingFriend);

  useEffect(() => {
    myRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(setMyName(doc.data().name));
          dispatch(setMyLanguage(doc.data().language));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  });

  return (
    <div>
      <Header />
      <Grid container direction="row" justify="space-between">
        <Grid item xs={12} md={3}>
          <Contacts />
        </Grid>
        <Grid item xs={12} md={4}>
          {isAddingFriend ? <AddFriend /> : isChatOpen ? <Chat /> : null}
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <FriendRequests />
        </Grid>
      </Grid>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(setIsSnackbarOpen());
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Main;
