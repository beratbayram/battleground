import { Field } from "@/generated/prisma";
import { btPrisma } from "@/prisma/btPrisma";

export async function getFields(): Promise<Field[]> {
  return await btPrisma.field.findMany();
}
