import { getFields } from "@/lib/api/getFields";
import { BtFieldCard } from "@/lib/components/BtFieldCard";
import { BtGrid } from "@/lib/components/BtGrid";
import { Field } from "@/lib/types/field";

export default async function Page() {
  const fields = await getFields();

  return (
    <main>
      <BtGrid container>
        {fields.map((field: Field) => (
          <BtGrid key={field.id}>
            <BtFieldCard field={field} />
          </BtGrid>
        ))}
      </BtGrid>
    </main>
  );
}
