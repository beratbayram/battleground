import { Unit } from "@/generated/prisma";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";

interface Props {
  unit: Unit;
}

export function BtUnitCard({ unit }: Props) {
  return (
    <Card sx={{ aspectRatio: "1/1" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={unit.name}
        subheader={`${unit.speed} km/h`}
      />
    </Card>
  );
}
