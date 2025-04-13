import { Unit } from "@/generated/prisma";
import { getUnits } from "@/lib/api/getUnits";
import { BtGrid } from "@/lib/components/BtGrid";
import { BtLink } from "@/lib/components/BtLink";
import { BtUnitCard } from "@/lib/components/BtUnitCard";

export default async function Page() {
  const units = await getUnits();

  return (
    <main>
      <BtGrid container>
        {units.map((unit: Unit) => (
          <BtGrid key={unit.id}>
            <BtLink
              sx={{ display: "contents", textTransform: "none" }}
              href={`/home/map?focusOnUnit=${unit.id}`}
            >
              <BtUnitCard unit={unit} />
            </BtLink>
          </BtGrid>
        ))}
      </BtGrid>
    </main>
  );
}
