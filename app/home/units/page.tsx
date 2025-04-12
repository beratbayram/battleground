import { getUnits } from "@/lib/api/getUnits";
import { BtGrid } from "@/lib/components/BtGrid";
import { BtUnitCard } from "@/lib/components/BtUnitCard";
import { Unit } from "@/lib/types/unit";

export default async function Page() {
  const units = await getUnits();

  return (
    <main>
      <BtGrid container>
        {units.map((unit: Unit) => (
          <BtGrid key={unit.id}>
            <BtUnitCard unit={unit} />
          </BtGrid>
        ))}
      </BtGrid>
    </main>
  );
}
