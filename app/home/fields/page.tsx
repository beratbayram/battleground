import { BtGrid } from "@/lib/components/BtGrid";
import { Field } from "@/lib/types/field";
import { BtFieldCard } from "@/lib/components/BtFieldCard";
import { btFetch } from "@/lib/utils/btFetch";

export default async function Page() {
  const fields: Field[] = await btFetch("/fields");

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
