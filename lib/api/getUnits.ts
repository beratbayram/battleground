"use server";

import { Unit } from "@/generated/prisma";
import { btPrisma } from "@/prisma/btPrisma";

export async function getUnits(): Promise<Unit[]> {
  return await btPrisma.unit.findMany();
}
