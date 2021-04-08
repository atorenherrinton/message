/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
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
  setMyEmail,
  setPassword,
  setUser,
  selectMyEmail,
  selectPassword,
} from "../../slices/authenticate";
import {
  setValidationError,
  setServerError,
  selectServerError,
  selectValidationError,
} from "../../slices/feedback";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  alert: {
    marginTop: "0.75rem",
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
    marginBottom: "1rem",
    width: "100%",
  },
  dropdown: {
    marginBottom: "1.25rem",
    width: "100%",
  },
});

const SignUp = () => {
  const dispatch = useDispatch();
  const myEmail = useSelector(selectMyEmail);
  const password = useSelector(selectPassword);
  const serverError = useSelector(selectServerError);
  const validationError = useSelector(selectValidationError);
  if (serverError) {
    setTimeout(() => {
      dispatch(setServerError(""));
    }, 3000);
  }
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateEmail(myEmail)) {
      firebase
        .auth()
        .signInWithEmailAndPassword(myEmail, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("userInfo", JSON.stringify(user.email));
          dispatch(setUser());
        })
        .catch((error) => {
          dispatch(setServerError(error.message));
        });
    } else {
      dispatch(setValidationError("Please enter a valid email"));
    }
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
                  dispatch(setMyEmail(event.target.value));
                }}
                error={validationError ? true : false}
                helperText={validationError}
                className={classes.input}
                label="Email"
                name="email"
                type="email"
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
                {serverError ? (
                  <Alert className={classes.alert} severity="warning">
                    {serverError}
                  </Alert>
                ) : null}
              </FormControl>

              <Button
                onClick={handleSubmit}
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Sign In
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
