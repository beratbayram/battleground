import { Field } from "@/generated/prisma";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";

interface Props {
  field: Field;
}

export function BtFieldCard({ field }: Props) {
  return (
    <Card sx={{ aspectRatio: "1/1" }}>
      <CardHeader
        action={
          <IconButton title="Ayarlar">
            <MoreVertIcon />
          </IconButton>
        }
        title={field.name}
        subheader={field.type}
      />
    </Card>
  );
}
