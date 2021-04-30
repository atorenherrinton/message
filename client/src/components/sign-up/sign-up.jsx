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
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import firebase from "../../firebase/firebase";
import {
  setHasAccount,
  setMyName,
  setMyEmail,
  setPassword,
  setWelcome,
  setMyLanguage,
  setUser,
  selectMyLanguage,
  selectWelcome,
  selectMyName,
  selectMyEmail,
  selectPassword,
} from "../../slices/authenticate";
import {
  setServerError,
  setValidationError,
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
  const myLanguage = useSelector(selectMyLanguage);
  const myName = useSelector(selectMyName);
  const myEmail = useSelector(selectMyEmail);
  const password = useSelector(selectPassword);
  const validationError = useSelector(selectValidationError);
  const serverError = useSelector(selectServerError);
  if (serverError) {
    setTimeout(() => {
      dispatch(setServerError(""));
    }, 3000);
  }
  const welcome = useSelector(selectWelcome);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const languages = [
    {
      value: "en",
      label: "English",
    },
    {
      value: "es",
      label: "Español",
    },
    {
      value: "it",
      label: "Italiano",
    },
    {
      value: "fr",
      label: "Français",
    },
    {
      value: "de",
      label: "Deutsch",
    },
  ];

  const createUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(myEmail, password)
      .then((userCredential) => {
        dispatch(setUser());
        const user = userCredential.user;
        localStorage.setItem("userInfo", JSON.stringify(user.email));
      })
      .catch((error) => {
        dispatch(setServerError(error.message));
      });
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateEmail(myEmail)) {
      createUser();
      // Add user to database
      const data = {
        action: "add_user_to_database",
        my_email: myEmail,
        my_name: myName,
        my_language: myLanguage,
      };

      fetch("https://message4.herokuapp.com/firebase", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("add_user_to_database:", data.result);
        })
        .catch((error) => {
          dispatch(setServerError(error));
        });
    } else {
      dispatch(setValidationError("Please enter a valid email"));
    }
  };

  return (
    <Card className={classes.root}>
      <div className={classes.header}>
        <Typography variant="overline" gutterBottom>
          {welcome ? "WELCOME" : "SIGN UP"}
        </Typography>
      </div>
      <div className={classes.content}>
        <CardContent>
          <form noValidate autoComplete="off">
            {welcome ? (
              <div>
                <Typography
                  className={classes.intro}
                  variant="body2"
                  gutterBottom
                >
                  Message translates your words into the language your friends
                  speak
                </Typography>

                <TextField
                  className={classes.dropdown}
                  select
                  label="Select your language"
                  value={myLanguage}
                  onChange={(event) => {
                    dispatch(setMyLanguage(event.target.value));
                    dispatch(setWelcome());
                  }}
                  variant="outlined"
                >
                  {languages.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            ) : (
              <div>
                <TextField
                  className={classes.dropdown}
                  select
                  label="Select your language"
                  value={myLanguage}
                  onChange={(event) => {
                    dispatch(setMyLanguage(event.target.value));
                  }}
                  variant="outlined"
                >
                  {languages.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  onChange={(event) => {
                    dispatch(setMyName(event.target.value));
                  }}
                  className={classes.input}
                  label="Name"
                  name="name"
                  variant="outlined"
                />
                <TextField
                  onChange={(event) => {
                    dispatch(setMyEmail(event.target.value));
                    if (validationError) {
                      dispatch(setValidationError(""));
                    }
                  }}
                  autoComplete="email"
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
                    autoComplete="new-password"
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
                  Sign up
                </Button>
              </div>
            )}

            <Button
              onClick={() => {
                dispatch(setHasAccount());
              }}
              className={classes.alternateButton}
              color="primary"
            >
              Already Have an account? Sign in instead
            </Button>
          </form>
        </CardContent>
      </div>
    </Card>
  );
};

export default SignUp;
