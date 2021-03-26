/** @format */

import React, { useEffect, useState } from "react";
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
        light: "#42464D",
        main: "#383C42",
        dark: "#0B0A0A",
        contrastText: "#fff",
      },
      secondary: {
        light: "#D7E9FF",
        main: "#479AFF",
        dark: "#0D7DD3",
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
