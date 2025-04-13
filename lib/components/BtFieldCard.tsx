import { Field } from "@/generated/prisma";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { revalidatePath } from "next/cache";
import { BtFieldCardMap } from "./BtFieldCardMap";
import "./BtFieldCard.scss";

interface Props {
  field: Field;
}

export function BtFieldCard({ field }: Props) {
  return (
    <Card sx={{ aspectRatio: "1" }}>
      <CardHeader
        action={
          <form
            action={async () => {
              "use server";
              const { removeField } = await import("@/lib/api/removeField");
              await removeField(field.id);
              revalidatePath("/home/fields");
            }}
          >
            <IconButton title="Ayarlar" type="submit">
              <DeleteIcon />
            </IconButton>
          </form>
        }
        title={field.name}
        subheader={field.type}
      />
      <div className="BtFieldCardContainer">
        <BtFieldCardMap
          positions={JSON.parse(field.coordinates)}
          focusOnSelections
        />
      </div>
    </Card>
  );
}
