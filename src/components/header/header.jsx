/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    margin: "auto",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appbar} color="primary" position="static">
      <Toolbar>
        <Typography align="center" variant="h6" className={classes.title}>
          Message
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
