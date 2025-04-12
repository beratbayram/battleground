"use client";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { BtDateTimePicker } from "./BtDateTimePicker";

interface BtDateRangeState {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface BtDateRangeProps {
  required?: boolean;
  defaultValue?: BtDateRangeState;
  onChange?: (state: { startDate: string; endDate: string }) => void;
}

export function BtDateRange({
  required,
  defaultValue: value,
  onChange,
}: BtDateRangeProps) {
  const [startDate, setStartDate] = useState<Dayjs | null>(
    value?.startDate ?? null
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(value?.endDate ?? null);

  function handleStartDateChange(newValue: Dayjs | null) {
    if (newValue) {
      setStartDate(newValue);
      onChange?.({
        startDate: newValue.format(),
        endDate: endDate?.format() ?? "",
      });
    }
  }
  function handleEndDateChange(newValue: Dayjs | null) {
    if (newValue) {
      setEndDate(newValue);
      onChange?.({
        startDate: startDate?.format() ?? "",
        endDate: newValue.format(),
      });
    }
  }

  return (
    <>
      <BtDateTimePicker
        value={startDate}
        onChange={handleStartDateChange}
        maxDate={endDate ?? undefined}
        label="Başlangıç"
        required={required}
      />
      <BtDateTimePicker
        value={endDate}
        minDate={startDate ?? undefined}
        onChange={handleEndDateChange}
        label="Bitiş"
        required={required}
      />
    </>
  );
}
