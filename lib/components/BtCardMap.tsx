"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import dynamic from "next/dynamic";
import { ComponentProps } from "react";

const BtMapFieldPicker = dynamic(
  () =>
    import("@/lib/components/BtMapFieldPicker").then(
      (mod) => mod.BtMapFieldPicker
    ),
  {
    ssr: false,
    loading: () => <CircularProgress />,
  }
);
export function BtCardMap(props: ComponentProps<typeof BtMapFieldPicker>) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      inert
    >
      <BtMapFieldPicker {...props}/>
    </Box>
  );
}