/** @format */

import React from "react";
import Chip from "@material-ui/core/Chip";

const Sent = (props) => {
  return (
    <Chip style={{ marginTop: "0.5rem" }} color="secondary" label={props.label} />
  );
};

export default Sent;
