import Card from "@mui/material/Card";
import { ComponentProps, ReactNode } from "react";
import classes from "./BtNewCard.module.scss";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { BtLink } from "./BtLink";

interface Props extends ComponentProps<typeof Card> {
  text: ReactNode;
  href: string;
}

export function BtNewCard({ text, href }: Props) {
  return (
    <BtLink key={1} href={href} color="inherit" className={classes.card}>
      <AddIcon className={classes.icon} />
      <Typography variant="button" className={classes.text}>{text}</Typography>
    </BtLink>
  );
}
