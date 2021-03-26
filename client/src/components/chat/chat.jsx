/** @format */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Message from "../message/message";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    maxWidth: 600,
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
}));

const Chat = () => {
  const classes = useStyles();
  const myEmail = useSelector(selectMyEmail);
  const myName = useSelector(selectMyLanguage);
  const myLanguage = useSelector(selectMyName);
  const otherEmail = useSelector(selectOtherEmail);
  const otherName = useSelector(selectOtherName);
  const otherLanguage = useSelector(selectOtherLanguage);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = () => {
    const data = {
      action: "load_messages",
      my_email: myEmail,
      other_email: otherEmail,
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
        setMessages(data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
        loadMessages();
        console.log("send_message:", data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      sendMessage();
      setMessage("");
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader
          avatar={<Avatar alt={otherName} className={classes.avatar} />}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={otherName}
        />
        <CardContent>
          {messages.map((message, idx) => (
            <Message
              key={idx}
              isFriend={message.email == otherEmail}
              text={message.message}
            />
          ))}
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
