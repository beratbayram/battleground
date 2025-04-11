import Container from "@mui/material/Container";
import { ComponentProps } from "react";

export function BtContainer(props: ComponentProps<typeof Container>) {
  return <Container maxWidth="lg" {...props} />;
}
