/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "../../slices/authenticate";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../../assets/logo.svg";

import firebase from "../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "#383C42"
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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleSubmit = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        dispatch(setUser());
        localStorage.clear();
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // An error happened.
      });
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} color="primary" position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography className={classes.title}>
                <img
                  className={classes.img}
                  src={logo}
                  width="125rem"
                  alt="logo"
                />
              </Typography>
            </Grid>
            <Grid item>
              {user ? (
                <Button
                  onClick={handleSubmit}
                  className={classes.signOut}
                  color="inherit"
                  variant="outlined"
                >
                  Sign Out
                </Button>
              ) : (
                <Hidden only="xs">
                  <Typography className={classes.title}>
                    Translate your message
                  </Typography>
                </Hidden>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
