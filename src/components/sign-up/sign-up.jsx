/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import PublicIcon from "@material-ui/icons/Public";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import translate from "../../assets/translate.svg";

import firebase from "../../firebase/firebase";
import {
  setEmail,
  setPassword,
  setWelcome,
  setLanguage,
  selectLanguage,
  selectWelcome,
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
  const language = useSelector(selectLanguage);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const welcome = useSelector(selectWelcome);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
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
        const credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user.uid);
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
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
                  Message translates your messages into the language your
                  friends speak
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
                  Sign up
                </Button>
                <Button
                  onClick={handleGoogleSignIn}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Sign Up With Google
                </Button>
              </div>
            )}

            <Button className={classes.alternateButton} color="primary">
              Already Have an account? Sign in instead
            </Button>
          </form>
        </CardContent>
      </div>
    </Card>
  );
};

export default SignUp;
