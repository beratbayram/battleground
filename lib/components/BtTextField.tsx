import TextField from "@mui/material/TextField";
import { ComponentProps } from "react";

export function BtTextField(props: ComponentProps<typeof TextField>) {
  return <TextField fullWidth margin="normal" variant="outlined" {...props} />;
}
