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
  setName,
  setEmail,
  setPassword,
  setError,
  setWelcome,
  setLanguage,
  setUser,
  selectError,
  selectLanguage,
  selectWelcome,
  selectName,
  selectEmail,
  selectPassword,
} from "../../slices/authenticate";

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
  const language = useSelector(selectLanguage);
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const error = useSelector(selectError);
  if (error) {
    setTimeout(() => {
      dispatch(setError(""));
    }, 3000);
  }
  const welcome = useSelector(selectWelcome);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const db = firebase.firestore();

  const languages = [
    {
      value: "English",
      label: "English",
    },
    {
      value: "Spanish",
      label: "Español",
    },
    {
      value: "Italian",
      label: "Italiano",
    },
    {
      value: "French",
      label: "Français",
    },
    {
      value: "German",
      label: "Deutsch",
    },
  ];

  const addUserToDatabase = () => {
    db.collection("users")
      .doc(email)
      .set({ name: name, language: language })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const createUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addUserToDatabase(user.uid);
        dispatch(setUser(user.uid));
      })
      .catch((error) => {
        dispatch(setError(error.message));
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser(email, password, name, language);
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
                  value={language}
                  onChange={(event) => {
                    dispatch(setLanguage(event.target.value));
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
                  value={language}
                  onChange={(event) => {
                    dispatch(setLanguage(event.target.value));
                    console.log(language);
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
                    dispatch(setName(event.target.value));
                  }}
                  className={classes.input}
                  label="Name"
                  name="name"
                  variant="outlined"
                />
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
                  {error ? (
                    <Alert className={classes.alert} severity="warning">
                      {error}
                    </Alert>
                  ) : null}
                </FormControl>
                <Button
                  onClick={handleSubmit}
                  className={classes.button}
                  variant="contained"
                  color="secondary"
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
