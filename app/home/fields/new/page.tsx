"use client";
import { BtAutoComplete } from "@/lib/components/BtAutoComplete";
import { BtButton } from "@/lib/components/BtButton";
import { BtDateRange } from "@/lib/components/BtDateRange";
import { BtTextField } from "@/lib/components/BtTextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { useState } from "react";
import classes from "./page.module.scss";
import { BtPositionsTable } from "@/lib/components/BtPositionsTable";
import { Field } from "@/generated/prisma";
import { FIELD_TYPES } from "@/lib/consts/FIELD_TYPES";
import { addField } from "@/lib/api/addField";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { useRouter } from "next/navigation";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  function handleDateChange(newValue: {
    startDate: Field["startTime"];
    endDate: Field["endTime"];
  }) {
    setStartDate(newValue.startDate);
    setEndDate(newValue.endDate);
  }

  async function handleSubmit() {
    if (!name || !type || !startDate || !endDate || positions.length === 0) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);
    const field: Omit<Field, "id"> = {
      name,
      type,
      startTime: startDate,
      endTime: endDate,
      coordinates: JSON.stringify(positions),
    };
    try {
      await addField(field);
      router.push("/home/fields");

    } catch (error) {
      console.error("Error adding field:", error);
      alert("Alan eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
    setLoading(false);
  }

  return (
    <main>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ display: "flex" }}>
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
