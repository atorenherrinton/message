/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import logo from "../../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  img: {
    marginTop: "0.75rem",
  },
  signOut: {
    textTransform: "capitalize",
  },
  title: {
    flexGrow: 1,
    margin: "auto",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography className={classes.title}>
            <img className={classes.img} src={logo} width="125rem" alt="logo" />
          </Typography>
          <Hidden only="xs">
            <Typography className={classes.title}>
              Translate your message
            </Typography>
          </Hidden>

          <Button
            className={classes.signOut}
            color="inherit"
            variant="outlined"
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
