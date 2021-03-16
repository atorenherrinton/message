/** @format */

import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Chat from "./components/chat/chat";
import Contacts from "./components/contacts/contacts";
import Grid from "@material-ui/core/Grid";
import Header from "./components/header/header";

const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#42464D",
        main: "#383C42",
        dark: "#2F3237",
        contrastText: "#fff",
      },
      secondary: {
        light: "#3FA5F3",
        main: "#279AF1",
        dark: "#1993F0",
        contrastText: "#fff",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <Grid
          container
          direction="row"
          justify="space-around"
          style={{ marginTop: "1rem" }}
        >
          <Grid container xs={4} spacing={3}>
            <Contacts />
          </Grid>
          <Grid container xs={8} spacing={3}>
            <Chat />
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default App;
