import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

type SnackbarContextType = {
  showMessage: (message: string, severity?: "success" | "error") => void;
};

const SnackbarContext = createContext<SnackbarContextType>({
  showMessage: () => {},
});

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const showMessage = (msg: string, sev: "success" | "error" = "success") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = () => useContext(SnackbarContext);
