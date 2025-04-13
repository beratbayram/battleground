"use server";

import "server-only";
import { Field } from "@/generated/prisma";
import { btPrisma } from "@/prisma/btPrisma";

export async function addField(field: Omit<Field, "id">): Promise<void> {
  await btPrisma.field.create({
    data: field,
  });
}
