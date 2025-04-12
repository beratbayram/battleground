"use client";
import { BtAutoComplete } from "@/lib/components/BtAutoComplete";
import { BtTextField } from "@/lib/components/BtTextField";
import { FIELD_TYPES } from "@/lib/types/field";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Page() {
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
        <BtTextField label="Alan Adı" required />
        <BtAutoComplete label="Alan Türü" required options={FIELD_TYPES} />
      </Box>
    </main>
  );
}
