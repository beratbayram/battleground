import { Unit } from "@/generated/prisma";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { revalidatePath } from "next/cache";
import { BtCardMap } from "./BtCardMap";
import { getUnitHistory } from "../api/getUnitHistory";

interface Props {
  unit: Unit;
}

export async function BtUnitCard({ unit }: Props) {
  const unitHistory = await getUnitHistory(unit.id);
  const positions = unitHistory.map(
    (history) => [history.lat, history.lng] as [number, number]
  );

  return (
    <Card sx={{ aspectRatio: "1" }}>
      <CardHeader
        action={
          <form
            action={async () => {
              "use server";
              const { removeUnit } = await import("@/lib/api/removeUnit");
              await removeUnit(unit.id);
              revalidatePath("/home/units");
            }}
          >
            <IconButton title="Ayarlar" type="submit">
              <DeleteIcon />
            </IconButton>
          </form>
        }
        title={unit.name}
        subheader={`${unit.speed} km/h`}
      />
      <div className="BtCardContainer">
        {positions.length > 0 ? (
          <BtCardMap positions={positions} focusOnSelections withPolyline />
        ) : (
          <div className="BtCardContainerEmpty">
            <p>Henüz bir konum kaydedilmedi.</p>
          </div>
        )}
      </div>
    </Card>
  );
}
