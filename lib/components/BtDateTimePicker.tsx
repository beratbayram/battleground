import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ComponentProps } from "react";

interface BtDateTimePickerProps extends ComponentProps<typeof DateTimePicker> {
  required?: boolean;
}

export function BtDateTimePicker(props: BtDateTimePickerProps) {
  return (
    <DateTimePicker
      {...props}
      slotProps={{
        textField: {
          required: props.required,
          fullWidth: true,
          margin: "normal",
        },
      }}
    />
  );
}
