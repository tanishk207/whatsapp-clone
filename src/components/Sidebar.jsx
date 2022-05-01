import React, { useEffect, useState } from "react";
import {
  Chat,
  Close,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { SidebarChat } from "./SidebarChat";
import db from "../firebase.js";
import { useStateValue } from "../utils/StateProvider";
import { actionType } from "../utils/reducer";

export const Sidebar = ({ visible }) => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div
      className={
        !visible && "hidden md:flex md:flex-col md:flex-[0.40] max-w-sm"
      }
    >
      <div className="header bg-gray-200 flex w-full items-center justify-between border-r-[1px] p-4 border-gray-300">
        {visible ? (
          <IconButton>
            <Close
              onClick={() =>
                dispatch({ type: actionType.SHOW_CHATMENU, openMenu: false })
              }
            />
          </IconButton>
        ) : (
          <Avatar src={user?.photoURL} />
        )}
        <div>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="search-container p-5 flex items-center">
        <div className="search p-2 w-full bg-gray-200 rounded-full flex ">
          <SearchOutlined className="text-gray-500" />
          <input
            type="text"
            className="bg-gray-200 rounded-lg outline-none ml-1 flex-1"
            placeholder="Search or start a new chat"
          />
        </div>
      </div>
      <div className="sidebar-chat-container flex h-[78%] flex-col ">
        <SidebarChat addNewChat />
        <div
          className={
            !visible &&
            "scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          }
        >
          {rooms.map((room) => (
            <SidebarChat id={room.id} key={room.id} data={room.data} visible />
          ))}
        </div>
      </div>
    </div>
  );
};
