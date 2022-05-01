import React from "react";
import { actionType } from "../utils/reducer";
import { auth, provider } from "../firebase";
import { useStateValue } from "../utils/StateProvider";
import whatsapp from "../utils/whatsapp.png";
import { Button } from "@mui/material";

export const Login = () => {
  const [, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg flex h-2/3 w-4/5 max-w-xl flex-col items-center justify-evenly">
      <img src={`${whatsapp}`} alt="whatsapp-clone" className="h-32" />
      <h1 className="font-bold text-3xl">Sign in to Whatsapp</h1>
      <button
        className="inline-block px-6 py-4 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
        variant="contained"
        onClick={signIn}
      >
        Sign in with Google
      </button>
    </div>
  );
};
