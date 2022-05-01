import { Drawer } from "@mui/material";
import React from "react";
import { Sidebar } from "./Sidebar";
import { useStateValue } from "../utils/StateProvider";
import { actionType } from "../utils/reducer";

export const ChatMenu = () => {
  const [{openMenu}, dispatch ] = useStateValue();

  return (
        <Drawer
        anchor="left"
        open={openMenu}
        onClose={() => dispatch({type: actionType.SHOW_CHATMENU, openMenu: false})}
      >          
        <Sidebar visible />
      </Drawer>
  );
};