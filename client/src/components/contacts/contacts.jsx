/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail } from "../../slices/authenticate";
import {
  setAddingFriend,
  selectIsAddingFriend,
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
  const email = useSelector(selectEmail);
  const isAddingFriend = useSelector(selectIsAddingFriend);
  const [friends, setFriends] = useState([]);

  const getFriends = () => {
    const data = {
      action: "get_friends",
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
        console.log("get_friends:", data.result);
        if (data.result) {
          setFriends(data.result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getFriends();
  }, []);

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
          color="secondary"
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
                <ListItem key={idx} alignItems="flex-start" button>
                  <ListItemAvatar>
                    <Avatar alt={friend.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={friend.name}
                    secondary={<React.Fragment>{friend.email}</React.Fragment>}
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
