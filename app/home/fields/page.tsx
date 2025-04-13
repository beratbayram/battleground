export const dynamic = "force-dynamic";

import { Field } from "@/generated/prisma";
import { getFields } from "@/lib/api/getFields";
import { BtFieldCard } from "@/lib/components/BtFieldCard";
import { BtGrid } from "@/lib/components/BtGrid";
import { BtLink } from "@/lib/components/BtLink";
import { BtNewCard } from "@/lib/components/BtNewCard";

export default async function Page() {
  const fields = await getFields();

  return (
    <main>
      <BtGrid container>
        {fields.map((field: Field) => (
          <BtGrid key={field.id}>
            <BtLink
              sx={{ display: "contents", textTransform: "none" }}
              href={`/home/map?focus=${field.id}`}
            >
              <BtFieldCard field={field} />
            </BtLink>
          </BtGrid>
        ))}
        <BtGrid>
          <BtNewCard text="Yeni Alan Ekle" href="/home/fields/new" />
        </BtGrid>
      </BtGrid>
    </main>
  );
}
