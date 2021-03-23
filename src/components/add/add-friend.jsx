/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectLanguage,
  selectName,
} from "../../slices/authenticate";
import { setAddingFriend } from "../../slices/communicate";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CloseIcon from "@material-ui/icons/Close";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import firebase from "../../firebase/firebase";

const useStyles = makeStyles({
  root: {
    marginTop: "2rem",
    minWidth: 275,
  },
  alert: {
    marginTop: "0.75rem",
  },
  button: {
    marginBottom: "0.75rem",
    textTransform: "capitalize",
    width: "100%",
  },
  close: {
    float: "right",
    marginRight: "0.75rem",
    marginTop: "0.25rem",
    cursor: "pointer",
  },
  content: {
    padding: "1rem 1rem 0rem 1rem",
  },
  header: {
    background: "#F4F5F6",
    padding: "1rem 0.5rem 1rem 0.5rem",
    textAlign: "center",
  },
  intro: {
    marginBottom: "1.5rem",
    textAlign: "left",
  },
  input: {
    marginBottom: "1rem",
    width: "100%",
  },
});

const AddFriend = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [friendEmail, setFriendEmail] = useState("");
  const myEmail = useSelector(selectEmail);
  const myName = useSelector(selectName);
  const myLanguage = useSelector(selectLanguage);

  const addFriend = () => {
    const db = firebase.firestore();
    const friendRef = db.collection("users").doc(friendEmail);
    const myRef = db.collection("users").doc(myEmail);

    friendRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const friendName = doc.data().name;
          const friendLanguage = doc.data().language;
          friendRef
            .collection("friend-requests")
            .doc(myEmail)
            .set({
              name: myName,
              lanugage: myLanguage,
              email: myEmail
            })
            .then(() => {
              myRef
                .collection("friend-requests")
                .doc(friendEmail)
                .set({
                  name: friendName,
                  language: friendLanguage,
                  email: friendEmail

                })
                .then(() => {
                  console.log("Document successfully written!");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        } else {
          // doc.data() will be undefined in this case
          // Invite a friend via email
          console.log("The user is not signed up");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addFriend();
  };

  return (
    <Card className={classes.root}>
      <div className={classes.header}>
        <Typography variant="overline" gutterBottom>
          ADD FRIEND
        </Typography>
        <CloseIcon
          onClick={() => {
            dispatch(setAddingFriend());
          }}
          className={classes.close}
        />
      </div>
      <div className={classes.content}>
        <CardContent>
          <form noValidate autoComplete="off">
            <Typography className={classes.intro} variant="body2" gutterBottom>
              Invite a friend to join your message.
            </Typography>
            <TextField
              onChange={(event) => {
                setFriendEmail(event.target.value);
              }}
              className={classes.input}
              label="Email"
              name="email"
              variant="outlined"
            />
            {/* <Alert className={classes.alert} severity="warning">
              {error}
            </Alert> */}
            <Button
              onClick={handleSubmit}
              className={classes.button}
              variant="contained"
              color="secondary"
            >
              Send Invite
            </Button>
          </form>
        </CardContent>
      </div>
    </Card>
  );
};

export default AddFriend;
