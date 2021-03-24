/** @format */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
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
    <div className={classes.root}>
      <Card>
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
            <Message
              key={idx}
              isFriend={message.isFriend}
              text={message.text}
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
              value={message.text}
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
            />
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
