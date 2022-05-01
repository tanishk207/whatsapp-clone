import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import db from "../firebase.js";
import { actionType } from "../utils/reducer.js";
import { useStateValue } from "../utils/StateProvider";

export const SidebarChat = ({ addNewChat, id, data, visible }) => {
  const [seed, setSeed] = useState(null);
  const [messages, setMessages] = useState("");
  const [, dispatch] = useStateValue();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const createChat = () => {
    dispatch({ type: actionType.SHOW_CHATMENU, openMenu: false });
    dispatch({ type: actionType.OPEN_DIALOG, open: true });
  };

  const closeChatMenu = () =>
    dispatch({ type: actionType.SHOW_CHATMENU, openMenu: false });

  const activeStyle = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#E5E7EB" : "",
    };
  };

  return addNewChat ? (
    <div onClick={createChat} className="p-5 cursor-pointer text-center">
      <h2 className="font-semibold text-2xl text-teal-500">Add a new Room</h2>
    </div>
  ) : (
    <NavLink
      style={activeStyle}
      to={`/rooms/${seed}/${id}`}
      onClick={() => {
        if (visible) closeChatMenu();
      }}
      className="sidebar-chat p-5 w-full border-[1px] border-b-0 border-gray-300 flex items-center hover:bg-gray-200 cursor-pointer"
    >
      <Avatar src={`https://randomuser.me/api/portraits/men/${seed}.jpg`} />
      <div className="chat-info ml-3">
        <p className="room-name font-semibold">{data.name}</p>
        <p className="last-message text-gray-500">{messages[0]?.message}</p>
      </div>
    </NavLink>
  );
};
