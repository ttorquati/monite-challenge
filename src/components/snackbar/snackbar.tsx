import { Alert, Snackbar as SnackBarMui } from "@mui/material";

type SnackbarProps = {
  message: string
  severity: "success" | "info" | "warning" | "error"
  open: boolean
  onClose: (_: React.SyntheticEvent | Event, reason?: string) => void
}

export function Snackbar({ message, severity, open, onClose }: SnackbarProps) {
  return (
    <SnackBarMui
        open={open}
        autoHideDuration={2000}
        onClose={onClose}
      >
        <Alert onClose={onClose} variant="filled" severity={severity} sx={{ width: '100%' }}>{message}</Alert>
      </SnackBarMui>
  )
}
