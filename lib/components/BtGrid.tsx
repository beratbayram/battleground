import Grid from "@mui/material/Grid";
import { ComponentProps } from "react";

export function BtGrid(props: ComponentProps<typeof Grid>) {
  return (
    <Grid
      size={2}
      spacing={2}
      padding={props.container ? 2 : 0}
      columns={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 12 }}
      {...props}
    />
  );
}
