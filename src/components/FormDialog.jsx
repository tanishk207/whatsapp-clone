import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useStateValue } from "../utils/StateProvider";
import { actionType } from "../utils/reducer";
import db from "../firebase";

export default function FormDialog() {
  const [{ open }, dispatch] = useStateValue();
  const [roomName, setRoomName] = React.useState("");

  const handleClose = () => {
    dispatch({ type: actionType.CLOSE_DIALOG, roomName: "", open: false });
  };

  const handleCreate = (event) => {
    event.preventDefault();
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
      setRoomName("");
      handleClose();
      dispatch({
        type: actionType.NOTIFY,
        notify: true,
        message: "SUCCESS: Room created.",
        status: "success",
      });
    } else {
      dispatch({
        type: actionType.NOTIFY,
        notify: true,
        message: "FAILURE: Room name cannot be empty.",
        status: "error",
      });
      handleClose();
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "700", color: "#128C7E" }}>
          Add Room
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter name of the room to be created.
          </DialogContentText>
          <form>
            <TextField
              sx={{
                "& .MuiInputLabel-root": { color: "#128C7E" },

                borderBottom: "1px solid #128C7E",
                borderRadius: 1,
              }}
              InputProps={{disableUnderline: true}}
              onChange={(event) => setRoomName(event.target.value)}
              value={roomName}
              autoFocus
              margin="dense"
              id="name"
              label="Room Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <button type="submit" className="hidden" onClick={handleCreate}>
              create
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#128C7E" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ color: "#128C7E" }} onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
