"use client";

import { Field, Unit, UnitHistory } from "@/generated/prisma";
import { getFields } from "@/lib/api/getFields";
import { getUnits } from "@/lib/api/getUnits";
import CircularProgress from "@mui/material/CircularProgress";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./page.module.scss";
import { getUnitHistory } from "@/lib/api/getUnitHistory";

const BtMainMap = dynamic(
  () => import("@/lib/components/BtMainMap").then((mod) => mod.BtMainMap),
  {
    loading: () => <CircularProgress />,
    ssr: false,
  }
);

async function gatherData(
  setFields: (fields: Field[]) => void,
  setUnits: (units: Unit[]) => void,
  setUnitHistory: (unitHistory: UnitHistory[]) => void
) {
  const fields = await getFields();
  setFields(fields);

  const units = await getUnits();
  setUnits(units);

  const unitHistories: UnitHistory[] = [];
  for (const unit of units) {
    const history = await getUnitHistory(unit.id);
    unitHistories.push(...history);
  }
  setUnitHistory(unitHistories);
}

export default function Page() {
  const [fields, setFields] = useState<Field[] | null>(null);
  const [units, setUnits] = useState<Unit[] | null>(null);
  const [unitHistory, setUnitHistory] = useState<UnitHistory[]>([]);
  const searchParams = useSearchParams();

  const focusOnField = parseInt(searchParams.get("focusOnField") ?? "-1");
  const focusOnUnit = parseInt(searchParams.get("focusOnUnit") ?? "-1");

  useEffect(() => {
    gatherData(setFields, setUnits, setUnitHistory);
    return () => {
      setFields(null);
      setUnits(null);
      setUnitHistory([]);
    };
  }, []);

  useEffect(() => {
    if (!fields || !units) return;

    return;

    const ws = new WebSocket("ws://localhost:8080");

    ws.addEventListener("open", () => {
      console.log("WebSocket connection opened");
    });
    ws.addEventListener("message", (event) => {
      const data = event.data;
      console.log("WebSocket message received:", data);
    });
    ws.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });
    ws.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });
    return () => {
      ws.close();
    };
  }, [fields, units]);

  if (!fields || !units) {
    return (
      <main className={classes.main}>
        <CircularProgress />
      </main>
    );
  }
  const focusField = fields.findIndex((field) => field.id === focusOnField);

  return (
    <main className={classes.main}>
      <BtMainMap
        fields={fields}
        units={units}
        unitHistory={unitHistory}
        focusField={focusField}
        focusUnit={focusOnUnit}
      />
    </main>
  );
}
