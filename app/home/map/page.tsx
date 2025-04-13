"use client";

import { Field } from "@/generated/prisma";
import { getFields } from "@/lib/api/getFields";
import CircularProgress from "@mui/material/CircularProgress";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./page.module.scss";

const BtMainMap = dynamic(
  () => import("@/lib/components/BtMainMap").then((mod) => mod.BtMainMap),
  {
    loading: () => <CircularProgress />,
    ssr: false,
  }
);

export default function Page() {
  const [fields, setFields] = useState<Field[]>([]);

  const focus = parseInt(useSearchParams().get("focus") ?? "-1");

  useEffect(() => {
    getFields().then(setFields);
  }, []);

  const focusIndex = fields.findIndex((field) => field.id === focus);

  return (
    <main className={classes.main}>
      {fields.length > 0 ? (
        <BtMainMap fields={fields} focusIndex={focusIndex} />
      ) : (
        <CircularProgress />
      )}
    </main>
  );
}
