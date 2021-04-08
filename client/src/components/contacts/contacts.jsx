/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMyEmail } from "../../slices/authenticate";
import {
  setAddingFriend,
  selectIsAddingFriend,
  setIsChatOpen,
  setOtherEmail,
  setOtherName,
  setOtherLanguage,
} from "../../slices/communicate";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import firebase from "../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1.5rem",
    width: "100%",
    maxWidth: "36ch",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  list: {
    marginTop: "1rem",
  },
  fab: {
    marginLeft: "1rem",
    textTransform: "capitalize",
    background: "linear-gradient(45deg, #ff2454 30%, #fb9f6f 90%)",
  },
}));

const Contacts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myEmail = useSelector(selectMyEmail);
  const isAddingFriend = useSelector(selectIsAddingFriend);
  const [friends, setFriends] = useState([]);
  const [lastMessage, setLastMessage] = useState("");
  const db = firebase.firestore();

  useEffect(() => {
    const getLastMessage = (otherEmail) => {
      db.collection("users")
        .doc(myEmail)
        .collection("friends")
        .doc(otherEmail)
        .collection("conversation")
        .orderBy("full_date", "desc")
        .limit(1)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setLastMessage(doc.data().message);
            console.log(lastMessage);
          });
        });
    };

    const getFriends = () => {
      db.collection("users")
        .doc(myEmail)
        .collection("friends")
        .onSnapshot((querySnapshot) => {
          const temp = [];
          querySnapshot.forEach((doc) => {
            getLastMessage(doc.data().email);
            const friend = { ...doc.data(), lastMessage: lastMessage };
            temp.push(friend);
            console.log(friend);
          });
          setFriends(temp);
        });
    };
    getFriends();
  }, [db, lastMessage, myEmail]);

  const handleOpenChat = (friend) => {
    if (isAddingFriend) {
      dispatch(setAddingFriend());
    }
    dispatch(setIsChatOpen(true));
    dispatch(setOtherEmail(friend.email));
    dispatch(setOtherName(friend.name));
    dispatch(setOtherLanguage(friend.language));
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Fab
          onClick={() => {
            if (!isAddingFriend) {
              dispatch(setAddingFriend());
            }
          }}
          color="primary"
          className={classes.fab}
          variant="extended"
        >
          <AddIcon className={classes.extendedIcon} />
          Add Friend
        </Fab>
        <Hidden only={["xs", "sm"]}>
          <List className={classes.list}>
            {friends.map((friend, idx) => {
              return (
                <ListItem
                  onClick={() => handleOpenChat(friend)}
                  key={idx}
                  alignItems="flex-start"
                  button
                >
                  <ListItemAvatar>
                    <Avatar alt={friend.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={friend.name}
                    secondary={
                      <React.Fragment>
                        {friend.lastMessage
                          ? friend.lastMessage.length > 43
                            ? friend.lastMessage.slice(0, 40).trim() + "..."
                            : friend.lastMessage
                          : `Start your conversation with ${friend.name}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Hidden>
      </Grid>
    </div>
  );
};

export default Contacts;
