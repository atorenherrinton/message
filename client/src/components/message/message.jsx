/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {

  },
  received: {
    backgroundColor: "#383C42",
    borderRadius: "0.5rem 0.5rem 0.5rem 0.1rem",
    color: "#fff",
    maxWidth: 425,
    padding: "0.25rem 0.75rem 0 0.75rem",
  },
  sent: {
    backgroundColor: "#479AFF",
    borderRadius: "0.5rem 0.5rem 0.1rem 0.5rem",
    color: "#fff",
    maxWidth: 425,
    padding: "0.25rem 0.75rem 0 0.75rem",
  },
}));

const Message = (props) => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        {props.isFriend ? (
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <div className={classes.received}>
              <Typography variant="body2" gutterBottom>
                {props.text}
              </Typography>
            </div>
          </Grid>
        ) : (
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-end"
          >
            <div className={classes.sent}>
              <Typography variant="body2" gutterBottom>
                {props.text}
              </Typography>
            </div>
          </Grid>
        )}
      </div>
  );
};

export default Message;
