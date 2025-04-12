import NextLink from "next/link";
import { ComponentProps } from "react";
import { BtButton } from "./BtButton";

interface Props extends ComponentProps<typeof BtButton> {
  href: string; // Ensure href is defined
}

export function BtLink(props: Props) {
  return (
    <BtButton
      LinkComponent={NextLink}
      rel="noopener noreferrer"
      variant="text"
      {...props}
    />
  );
}
