/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Received from "../receieved/received";
import Sent from "../sent/sent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    marginTop: "1.75rem",
    marginLeft: "2rem",
  },
  chip: {},
}));

const Chat = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Received label="Great to hear" />
        <Sent label="I'll be in your neighborhood doing errands this weekend. Do you need anything from the store?" />
      </Grid>
    </div>
  );
};

export default Chat;
