import Autocomplete from "@mui/material/Autocomplete";
import { BtTextField } from "./BtTextField";
import { ComponentProps } from "react";

interface Props
  extends Omit<ComponentProps<typeof Autocomplete>, "renderInput"> {
  label: string;
  required?: boolean;
}

export function BtAutoComplete(props: Props) {
  return (
    <Autocomplete
      disablePortal
      fullWidth
      {...props}
      renderInput={(params) => (
        <BtTextField
          {...params}
          label={props.label}
          required={props.required}
        />
      )}
    />
  );
}
