"use client";
import { BtAutoComplete } from "@/lib/components/BtAutoComplete";
import { BtButton } from "@/lib/components/BtButton";
import { BtDateRange } from "@/lib/components/BtDateRange";
import { BtTextField } from "@/lib/components/BtTextField";
import { Field, FIELD_TYPES } from "@/lib/types/field";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { useState } from "react";
import classes from "./page.module.scss";
import { BtPositionsTable } from "@/lib/components/BtPositionsTable";

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

export default function Page() {
  const [name, setName] = useState<Field["name"]>("");
  const [type, setType] = useState<Field["type"] | undefined>();
  const [startDate, setStartDate] = useState<Field["startTime"] | undefined>();
  const [endDate, setEndDate] = useState<Field["endTime"] | undefined>();
  const [positions, setPositions] = useState<[number, number][]>([]);

  function handleDateChange(newValue: {
    startDate: Field["startTime"];
    endDate: Field["endTime"];
  }) {
    setStartDate(newValue.startDate);
    setEndDate(newValue.endDate);
  }

  function handleSubmit() {
    if (!name || !type || !startDate || !endDate) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const field: Field = {
      id: 0,
      name,
      type,
      startTime: startDate,
      endTime: endDate,
      coordinates: JSON.stringify(positions),
    };
    console.log("Field created:", field);
  }

  return (
    <main>
      <Box sx={{ display: "flex" }} >
        <Box
          maxWidth={400}
          padding={2}
          boxShadow={2}
          height={"calc(100vh - 48px)"}
          overflow={"auto"}
        >
          <Typography variant="h4" component="h3" gutterBottom>
            Yeni Alan Ekle
          </Typography>
          <BtTextField
            label="Alan Adı"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <BtAutoComplete
            label="Alan Türü"
            required
            options={FIELD_TYPES}
            onChange={(_, value) => setType(value as Field["type"])}
          />
          <BtDateRange onChange={handleDateChange} required />
          <BtPositionsTable positions={positions} setPositions={setPositions} />
          <Box gap={2} display="flex" flexDirection={"row-reverse"}>
            <BtButton onClick={handleSubmit} color="success">
              Kaydet
            </BtButton>
            <BtButton href="/home/fields" color="error">
              İptal
            </BtButton>
          </Box>
        </Box>
        <div className={classes.container}>
          <BtMapFieldPicker positions={positions} setPositions={setPositions} />
        </div>
      </Box>
    </main>
  );
}
