import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { Field } from "../types/field";

interface Props {
  field: Field;
}

export function BtFieldCard({ field }: Props) {
  return (
    <Card sx={{ aspectRatio: "1/1" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={field.name}
        subheader={field.type}
      />
      <CardMedia component="img" height={350} image="" alt="map" />
    </Card>
  );
}
