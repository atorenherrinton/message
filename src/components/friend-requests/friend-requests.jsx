/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectName,
  selectLanguage,
} from "../../slices/authenticate";
import { makeStyles } from "@material-ui/core/styles";
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
  const email = useSelector(selectEmail);
  const name = useSelector(selectName);
  const language = useSelector(selectLanguage);

  const [friendsList, setFriendsList] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    const friendRequestsRef = db
      .collection("users")
      .doc(email)
      .collection("friend-requests");
    friendRequestsRef.get().then((querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        temp.push(doc.data());
      });
      setFriendsList(temp);
    });
  }, []);

  const handleAddFriend = (friend) => {
    const myRef = db.collection("users").doc(email).collection("friends");
    const friendRef = db
      .collection("users")
      .doc(friend.email)
      .collection("friends");

    myRef
      .doc(friend.email)
      .set({ name: name, lanugage: language, email: email })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    friendRef
      .doc(email)
      .set({ name: friend.name, lanugage: friend.language, email: friend.email })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  const handleIgnoreFriend = () => {};

  return (
    <div>
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
        {friendsList.map((friend, idx) => {
          const labelId = `checkbox-list-secondary-label-${friend.name}`;
          return (
            <div key={idx}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    alt={friend.name}
                    src={`/static/images/avatar/${friend.name + 1}.jpg`}
                  />
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
                  <Button className={classes.button} size="small">
                    ignore
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default FriendRequests;
