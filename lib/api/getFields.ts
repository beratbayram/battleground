import { btPrisma } from "@/prisma/btPrisma";
import { Field } from "../types/field";

export async function getFields(): Promise<Field[]> {
  return await btPrisma.field.findMany();
}
