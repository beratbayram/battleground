'use client';


import dynamic from "next/dynamic";
import classes from "./page.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

const BtMap = dynamic(
  () => import("@/lib/components/BtMap").then((mod) => mod.BtMap),
  {
    loading: () => <CircularProgress />,
    ssr: false,
  }
);

export default function Page() {
  return (
    <main className={classes.main}>
      <BtMap />
    </main>
  );
}
