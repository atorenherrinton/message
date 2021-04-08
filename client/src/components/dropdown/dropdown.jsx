/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import { setOpenDialog, setOpenDropdown } from "../../slices/actions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

const useStyles = makeStyles((theme) => ({
  popperButton: {
    textTransform: "capitalize",
  },
}));

const Dropdown = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(setOpenDialog());
    dispatch(setOpenDropdown());
  };

  return (
    <Popper
      className={classes.popper}
      anchorEl={props.anchorEl}
      open={props.open}
      placement={props.placement}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.popperPaper}>
            <Button onClick={handleDelete} className={classes.popperButton}>
              Delete Conversation
            </Button>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};
export default Dropdown;
