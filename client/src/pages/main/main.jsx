/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName, setLanguage, selectEmail } from "../../slices/authenticate";
import {
  loadFriendRequests,
  setInviteSent,
  selectIsAddingFriend,
  selectInviteSent,
} from "../../slices/communicate";
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
  const email = useSelector(selectEmail);
  const db = firebase.firestore();
  const myRef = db.collection("users").doc(email);
  const isAddingFriend = useSelector(selectIsAddingFriend);
  const inviteSent = useSelector(selectInviteSent);

  const getFriendRequests = () => {
    const data = {
      action: "get_friend_requests",
      email: email,
    };

    fetch("/firebase", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Result:", data.result);
        if (data.result) {
          dispatch(loadFriendRequests(data.result));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
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
    getFriendRequests();
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

      <Snackbar
        open={inviteSent}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(setInviteSent());
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message="Your invite was sent!"
      />
    </div>
  );
};

export default Main;
