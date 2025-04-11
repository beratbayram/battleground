import { BtGrid } from "@/lib/components/BtGrid";
import { Field } from "@/lib/types/field";
import { BtFieldCard } from "@/lib/components/BtFieldCard";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/fields");
  const fields: Field[] = await res.json();

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
