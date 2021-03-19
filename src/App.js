/** @format */

import React from "react";
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

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Authenticate />
      </ThemeProvider>
    </div>
  );
};

export default App;
