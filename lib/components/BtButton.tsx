import Button from "@mui/material/Button";
import { ComponentProps } from "react";

export function BtButton(props: ComponentProps<typeof Button>) {
  return <Button variant="contained" {...props} />;
}
