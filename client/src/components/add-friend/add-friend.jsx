/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMyEmail } from "../../slices/authenticate";
import {
  setValidationError,
  selectValidationError,
  setIsSnackbarOpen,
  setSnackbarMessage,
} from "../../slices/feedback";
import { setAddingFriend } from "../../slices/communicate";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CloseIcon from "@material-ui/icons/Close";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: "2rem",
    marginBottom: "5rem",
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
  const [otherEmail, setOtherEmail] = useState("");
  const myEmail = useSelector(selectMyEmail);
  const validationError = useSelector(selectValidationError);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // if the email isn't valid
    if (validateEmail(otherEmail)) {
      const data = {
        action: "send_friend_request",
        my_email: myEmail,
        other_email: otherEmail,
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
          console.log("send_friend_request:", data.result);
          setOtherEmail("");
          dispatch(setAddingFriend());
          dispatch(setIsSnackbarOpen());
          dispatch(setSnackbarMessage("Your friend request was sent"));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      dispatch(setValidationError("Please enter a valid email"));
    }
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
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Typography className={classes.intro} variant="body2" gutterBottom>
              Invite a friend to join your message.
            </Typography>
            <TextField
              onChange={(event) => {
                setOtherEmail(event.target.value);
              }}
              error={validationError ? true : false}
              helperText={validationError}
              className={classes.input}
              label="Email"
              name="email"
              type="email"
              value={otherEmail}
              variant="outlined"
            />
            <Button
              className={classes.button}
              type="submit"
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
