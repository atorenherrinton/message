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
        dark: "#0B0A0A",
        contrastText: "#fff",
      },
      secondary: {
        light: "#1993F0",
        main: "#0F89E6",
        dark: "#0D7DD3",
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
          style={{ marginTop: "2rem" }}

        >
          <Grid item xs={10} md={3}>
            <Contacts />
          </Grid>
          <Grid item xs={10} md={8}>
            <Chat />
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default App;
