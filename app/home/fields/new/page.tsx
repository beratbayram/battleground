"use client";
import { BtAutoComplete } from "@/lib/components/BtAutoComplete";
import { BtButton } from "@/lib/components/BtButton";
import { BtDateRange } from "@/lib/components/BtDateRange";
import { BtTextField } from "@/lib/components/BtTextField";
import { Field, FIELD_TYPES } from "@/lib/types/field";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState<Field["name"]>("");
  const [type, setType] = useState<Field["type"] | undefined>();
  const [startDate, setStartDate] = useState<Field["startTime"] | undefined>();
  const [endDate, setEndDate] = useState<Field["endTime"] | undefined>();

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
      coordinates: [
        [0, 0],
        [0, 0],
      ],
    };
    console.log("Field created:", field);
  }

  return (
    <main>
      <Box
        maxWidth={400}
        padding={2}
        boxShadow={2}
        height={"calc(100vh - 48px)"}
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
        <BtButton onClick={handleSubmit}>Kaydet</BtButton>
      </Box>
    </main>
  );
}
