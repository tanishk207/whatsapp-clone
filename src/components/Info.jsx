import { Avatar, IconButton } from "@mui/material";
import React from "react";
import info from "../utils/end-to-end.png";
import { useStateValue } from "../utils/StateProvider";
import { actionType } from '../utils/reducer'
import { ChatMenu } from './ChatMenu'

export const Info = () => {
  const [{ user }, dispatch ] = useStateValue();

  const openMenu = () => {
    dispatch({ type: actionType.SHOW_CHATMENU, openMenu: true });
  };

  return (
    <div className="overflow-hidden flex flex-1  flex-col items-center md:flex-[0.60] lg:flex-1 text-gray-500">
      <ChatMenu />
      <div className="md:hidden self-start">
      <IconButton>
        <Avatar onClick={openMenu} src={user?.photoURL} />
      </IconButton>
      </div>
      <img src={info} alt="end-to-end-encrypted" className="h-52 mb-9 mt-16" />
      <h1 className="font-light text-4xl mb-7">WhatsApp Web</h1>
      <div className="text-center p-5">
        <p>Now send and receive messages without keeping phone online</p>
        <p>
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time
        </p>
      </div>
      <p className="text-center p-5">
        Make calls from desktop with WhatsApp for Windows.{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.whatsapp.com/download"
          className="text-teal-500"
        >
          Get it here
        </a>
      </p>
    </div>
  );
};
