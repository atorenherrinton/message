/** @format */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Message from "../message/message";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    maxWidth: 600,
    marginTop: "3rem",
    marginBottom: "5rem",
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    marginTop: "0.75rem",
    width: "100%",
  },
  input: {
    marginTop: "2rem",
  },
  textField: {
    borderRadius: "1.25rem",
    width: "100%",
  },
}));

const Chat = () => {
  const classes = useStyles();
  const [message, setMessage] = useState({
    text: "",
    isFriend: true,
  });
  const [messages, setMessages] = useState([]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setMessage({ ...message, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.text.length > 0) {
      setMessages([...messages, message]);
      setMessage({ text: "", isFriend: !message.isFriend });
    }
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            S
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Seth Toren-Herrinton"
      />
      <CardContent>
        {messages.map((message, idx) => (
          <Message key={idx} isFriend={message.isFriend} text={message.text} />
        ))}
        <div className={classes.input}>
          <TextField
            onChange={handleChange}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSubmit(event);
              }
            }}
            name="text"
            value={message.text}
            id="outlined-basic"
            label="Your Message"
            multiline
            variant="outlined"
            size="small"
            className={classes.textField}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            endIcon={<SendIcon />}
            className={classes.button}
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chat;
