/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import firebase from "../../firebase/firebase";
import {
  setHasAccount,
  setEmail,
  setPassword,
  setUser,
  selectEmail,
  selectPassword,
} from "../../slices/authenticate";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  appbar: {
    width: "100%",
  },
  button: {
    marginBottom: "0.75rem",
    textTransform: "capitalize",
    width: "100%",
  },
  content: {
    padding: "1rem 1rem 0rem 1rem",
  },
  alternateButton: {
    textTransform: "capitalize",
    width: "100%",
  },
  header: {
    background: "#F4F5F6",
    padding: "1rem 0.5rem 1rem 0.5rem",
    textAlign: "center",
  },
  icon: {
    marginTop: "0.5rem",
    marginRight: "-0.75rem",
  },
  intro: {
    marginBottom: "1.5rem",
    textAlign: "left",
  },
  input: {
    marginBottom: "1.5rem",
    width: "100%",
  },
  dropdown: {
    marginBottom: "1.25rem",
    width: "100%",
  },
});

const SignUp = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUser(user.uid));
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleGoogleSignIn = (event) => {
    event.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // const credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch(setUser(user.uid));
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <Card className={classes.root}>
      <div className={classes.header}>
        <Typography variant="overline" gutterBottom>
          SIGN IN
        </Typography>
      </div>
      <div className={classes.content}>
        <CardContent>
          <form noValidate autoComplete="off">
            <div>
              <TextField
                onChange={(event) => {
                  dispatch(setEmail(event.target.value));
                }}
                className={classes.input}
                label="Email"
                name="email"
                variant="outlined"
              />
              <FormControl className={classes.input} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  onChange={(event) => {
                    dispatch(setPassword(event.target.value));
                  }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <Button
                onClick={handleSubmit}
                className={classes.button}
                variant="contained"
                color="secondary"
              >
                Sign In
              </Button>
              <Button
                onClick={handleGoogleSignIn}
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Sign In With Google
              </Button>
            </div>
            <Button
              onClick={() => {
                dispatch(setHasAccount());
              }}
              className={classes.alternateButton}
              color="primary"
            >
              Don't Have an account? Sign Up instead
            </Button>
          </form>
        </CardContent>
      </div>
    </Card>
  );
};

export default SignUp;
