import { Alert, Snackbar } from "@mui/material";
import { forwardRef } from "react";
import { actionType } from "../utils/reducer";
import { useStateValue } from "../utils/StateProvider";

export const Notify = () => {
  const [{ message, status, notify }, dispatch] = useStateValue();

  const handleClose = (reason) => {
    if (reason === "clickaway") return;
    dispatch({ type: actionType.NOTIFY, message: "", status: "", notify: false });
  };

  const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
    return <Alert elevation={6} ref={ref} {...props} />;
  });

  return (
    <Snackbar
      open={notify}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <SnackbarAlert onClose={handleClose} severity={status}>
        <p>{message}</p>
      </SnackbarAlert>
    </Snackbar>
  );
};
