import { btPrisma } from "@/prisma/btPrisma";
import { Unit } from "../types/unit";

export async function getUnits(): Promise<Unit[]> {
  return await btPrisma.unit.findMany();
}
