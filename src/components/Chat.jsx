import {
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useParams } from "react-router-dom";
import { useStateValue } from "../utils/StateProvider";
import db from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { ChatMenu } from "./ChatMenu";
import { actionType } from "../utils/reducer";

export const Chat = () => {
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { seed, roomId } = useParams();
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const openMenu = () => {
    dispatch({ type: actionType.SHOW_CHATMENU, openMenu: true });
  };

  return (
    <div className="flex flex-col chat flex-1 md:flex-[0.60] lg:flex-1">
      <div className="chat-header bg-gray-200 flex items-center justify-between p-4">
        <div className="flex items-center">
          <ChatMenu />
          <div className="md:hidden">
          <IconButton>
            <Avatar onClick={openMenu} src={user?.photoURL} />
          </IconButton>
          </div>
          <Avatar src={`https://randomuser.me/api/portraits/men/${seed}.jpg`} />
          <div className="flex flex-col ml-3">
            <p className="room-name font-semibold">{roomName}</p>
            <p className="last-seen text-xs">
              Last seen{" "}
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}
            </p>
          </div>
        </div>
        <div className="flex">
          <IconButton>
            <SearchOutlined className="text-gray-500" />
          </IconButton>
          <IconButton>
            <MoreVert className="text-gray-500" />
          </IconButton>
        </div>
      </div>
      <div
        style={{
          backgroundImage:
            "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
        }}
        className="chat-body overflow-y-scroll flex-1 bg-repeat bg-center p-[30px] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      >
        {messages.map((message) => (
          <p
            className={
              message.name === user.displayName
                ? "relative ml-auto p-[10px] bg-[#dcf8c6] rounded-xl w-fit mb-7"
                : "chat-message relative p-[10px] bg-white rounded-xl w-fit mb-7"
            }
          >
            <span
              className={`chat-name absolute -top-4 font-semibold text-xs ${
                message.name === user.displayName && "right-1"
              }`}
            >
              {message.name}
            </span>
            {message.message}
            <span className="chat-timestamp ml-[10px] text-xs">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat-footer p-5 w-full flex items-center justify-between bg-gray-200">
        <div>
          <InsertEmoticon className="text-gray-500" />
          <AttachFileIcon className="text-gray-500 md:mx-3" />
        </div>
        <form className="flex flex-1">
          <input
            type="text"
            value={input}
            placeholder="Type a message"
            className="rounded-full flex-1 w-auto p-2 outline-none box-border"
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit" onClick={sendMessage} className="hidden">
            Send a message
          </button>
        </form>
        <Mic className="text-gray-500 ml-3" />
      </div>
    </div>
  );
};
