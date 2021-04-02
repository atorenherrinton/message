/** @format */

import React, { useEffect, useState } from "react";
import { setIsSnackbarOpen, setSnackbarMessage } from "../../slices/feedback";
import { useDispatch, useSelector } from "react-redux";
import { selectMyEmail } from "../../slices/authenticate";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListSubheader from "@material-ui/core/ListSubheader";

import firebase from "../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "0.5rem",
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginLeft: "0.5rem",
    textTransform: "capitalize",
  },
  item: {
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "1rem",
    fontWeight: 600,
  },
}));

const FriendRequests = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myEmail = useSelector(selectMyEmail);

  const [friendRequests, setFriendRequests] = useState([]);

  const getFriendRequests = () => {
    const db = firebase.firestore();
    db.collection("users")
      .doc(myEmail)
      .collection("friend-requests")
      .onSnapshot((querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((doc) => {
          temp.push(doc.data());
        });
        setFriendRequests(temp);
      });
  };

  const handleAddFriend = (friend) => {
    const data = {
      action: "accept_friend_request",
      my_email: myEmail,
      other_email: friend.email,
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
        getFriendRequests();
        console.log("accept_friend_request:", data.result);
        dispatch(setIsSnackbarOpen());
        dispatch(
          setSnackbarMessage(`${friend.name} was added to your friends list`)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleIgnoreFriend = (friend) => {
    const data = {
      action: "delete_friend_request",
      my_email: myEmail,
      other_email: friend.email,
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
        console.log("delete_friend_request:", data.result);
        getFriendRequests();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getFriendRequests();
  }, []);

  return (
    <div>
      {friendRequests.length > 0 ? (
        <List className={classes.root}>
          {
            <ListSubheader
              className={classes.title}
              component="div"
              id="nested-list-subheader"
            >
              Friend Requests
            </ListSubheader>
          }
          {friendRequests.map((friend, idx) => {
            const labelId = `checkbox-list-secondary-label-${friend.name}`;
            return (
              <div key={idx}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={friend.name} />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={friend.name} />
                  <ListItemSecondaryAction>
                    <Button
                      onClick={() => {
                        handleAddFriend(friend);
                      }}
                      className={classes.button}
                      size="small"
                      variant="outlined"
                    >
                      add
                    </Button>
                    <Button
                      onClick={() => {
                        handleIgnoreFriend(friend);
                      }}
                      className={classes.button}
                      size="small"
                    >
                      ignore
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
            );
          })}
        </List>
      ) : null}
    </div>
  );
};

export default FriendRequests;
