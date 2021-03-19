/** @format */

import React from "react";
import Chat from "../../components/chat/chat";
import Contacts from "../../components/contacts/contacts";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/header/header";

const Main = () => {
  return (
    <div>
      <Header />
      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginTop: "1.5rem" }}
      >
        <Grid item xs={10} md={4}>
          <Contacts />
        </Grid>
        <Grid item xs={10} md={3}>
          <Chat />
        </Grid>
        <Grid item xs={10} md={5} />
      </Grid>
    </div>
  );
};

export default Main;
