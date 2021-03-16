/** @format */

import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const Received = (props) => {
  return (
    <Chip
      avatar={<Avatar>M</Avatar>}
      style={{ marginTop: "0.5rem" }}
      color="primary"
      label={props.label}
    />
  );
};

export default Received;
