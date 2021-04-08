/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOpenDropdown, setOpenDropdown } from "../../slices/actions";
import {
  selectMyEmail,
  selectMyLanguage,
  selectMyName,
} from "../../slices/authenticate";

import {
  selectOtherEmail,
  selectOtherLanguage,
  selectOtherName,
} from "../../slices/communicate";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import DeleteConversation from "../dialog/delete-conversation";
import Dropdown from "../dropdown/dropdown";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Messages from "../messages/messages";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { red } from "@material-ui/core/colors";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    maxWidth: 600,
    height: "33%",
    marginTop: "2rem",
    marginBottom: "5rem",
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    marginTop: "0.75rem",
    textTransform: "capitalize",
    width: "100%",
  },
  input: {
    marginTop: "2rem",
    width: "100%",
  },
  messages: {
    width: "100%",
    height: 350,
  },
  popperButton: {
    textTransform: "capitalize",
  },
}));

const Chat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myEmail = useSelector(selectMyEmail);
  const myName = useSelector(selectMyLanguage);
  const myLanguage = useSelector(selectMyName);
  const otherEmail = useSelector(selectOtherEmail);
  const otherName = useSelector(selectOtherName);
  const otherLanguage = useSelector(selectOtherLanguage);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = useSelector(selectOpenDropdown);
  const [placement, setPlacement] = useState();

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    const data = {
      action: "send_message",
      my_email: myEmail,
      my_name: myName,
      my_language: myLanguage,
      other_email: otherEmail,
      other_name: otherName,
      other_language: otherLanguage,
      message: message,
    };

    fetch("/firebase", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("send_message:", data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(setOpenDropdown((prev) => placement !== newPlacement || !prev));
    setPlacement(newPlacement);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      sendMessage();
      setMessage("");
    }
  };

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader
          avatar={<Avatar alt={otherName} className={classes.avatar} />}
          action={
            <IconButton onClick={handleClick("right")} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={otherName}
        />
        <Dropdown anchorEl={anchorEl} open={open} placement={placement} />
        <DeleteConversation otherName={otherName} />
        <CardContent>
          <Messages />
          <FormControl className={classes.input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Message
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              name="text"
              value={message}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSubmit(event);
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSubmit}
                    edge="end"
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={67}
              autoComplete="off"
            />
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
