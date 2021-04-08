/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setMyEmail, setUser } from "./slices/authenticate";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Main from "../src/pages/main/main";
import Authenticate from "./pages/authenticate/authenticate";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "hidden",
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#1F84FF",
        main: "#006EF5",
        dark: "#005CCC",
        contrastText: "#fff",
      },
      secondary: {
        light: "#FF476F",
        main: "#FF2454",
        dark: "#F50035",
        contrastText: "#fff",
      },
    },
  });

  const [loaded, setLoaded] = useState(false);
  const cache = JSON.parse(localStorage.getItem("userInfo"));

  if (!loaded && cache) {
    console.log(cache);
    dispatch(setUser());
    dispatch(setMyEmail(cache));
    setLoaded(true);
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        {user ? <Main /> : <Authenticate />}
      </ThemeProvider>
    </div>
  );
};

export default App;
