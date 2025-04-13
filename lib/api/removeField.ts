"use server";

import "server-only";
import { btPrisma } from "@/prisma/btPrisma";
import { Field } from "@/generated/prisma";

export async function removeField(id: Field["id"]): Promise<void> {
  await btPrisma.field.delete({
    where: {
      id,
    },
  });
}
