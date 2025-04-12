'use client';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import 'dayjs/locale/tr';

interface Props {
  children: React.ReactNode;
}

export function BtLocalizationProvider({ children }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
      {children}
    </LocalizationProvider>
  );
}
