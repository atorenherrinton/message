/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenDialog, selectOpenDialog } from "../../slices/actions";
import { selectMyEmail } from "../../slices/authenticate";
import { selectOtherEmail } from "../../slices/communicate";
import { setIsLoading } from "../../slices/feedback";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  buttonSecondary: {
    textTransform: "capitalize",
  },
  buttonPrimary: {
    background: "#ff2454",
    textTransform: "capitalize",
  },
}));

const DeleteConversation = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myEmail = useSelector(selectMyEmail);
  const otherEmail = useSelector(selectOtherEmail);
  const open = useSelector(selectOpenDialog);

  const deleteConversation = () => {
    const data = {
      action: "delete_conversation",
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
        console.log("delete_conversation:", data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancel = () => {
    dispatch(setOpenDialog());
  };

  const handleDelete = () => {
    dispatch(setIsLoading());
    deleteConversation();
    dispatch(setOpenDialog());
    dispatch(setIsLoading());
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete your conversation with ${props.otherName}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`If you delete your conversation with ${props.otherName}, it will be deleted for you, but not the other person. Are you sure you want to do this?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancel}
            className={classes.buttonSecondary}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className={classes.buttonPrimary}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Confirm Deletion
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteConversation;
