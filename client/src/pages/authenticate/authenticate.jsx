/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { selectHasAccount } from "../../slices/authenticate";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/header/header";
import SignUp from "../../components/sign-up/sign-up.jsx";
import SignIn from "../../components/sign-in/sign-in.jsx";
import Background from "../../components/background/background";

const useStyles = makeStyles((theme) => ({
  root: { marginTop: "5rem", marginBottom: "5rem" },
}));

const Authenticate = () => {
  const classes = useStyles();
  const hasAccount = useSelector(selectHasAccount);
  return (
    <div>
      <Header />
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={8}
      >
        <Grid item xs={10} sm={8} md={4}>
          <Background />
        </Grid>
        <Grid item xs={10} sm={8} md={3}>
          {hasAccount ? <SignIn /> : <SignUp />}
        </Grid>
        <Grid item xs={10} md={1} />
      </Grid>
    </div>
  );
};

export default Authenticate;
