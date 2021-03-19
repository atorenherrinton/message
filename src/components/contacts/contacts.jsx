/** @format */

import React from "react";
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
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Fab color="secondary" className={classes.fab} variant="extended">
          <AddIcon className={classes.extendedIcon} />
          New Message
        </Fab>
        <Hidden only={["xs", "sm"]}>
          <List className={classes.list}>
            <ListItem alignItems="flex-start" button>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    {"I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem alignItems="flex-start" button>
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    {"Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>

            <ListItem alignItems="flex-start" button>
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Sandra Adams"
                secondary={
                  <React.Fragment>
                    {"Do you have Paris recommendations? Have you ever…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Hidden>
      </Grid>
    </div>
  );
};

export default Contacts;
