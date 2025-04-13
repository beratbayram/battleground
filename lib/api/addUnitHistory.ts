"use server";

import "server-only";
import { btPrisma } from "@/prisma/btPrisma";
import { UnitHistory } from "@/generated/prisma";

export async function addUnitHistory(unitHistory: UnitHistory): Promise<void> {
  await btPrisma.unitHistory.create({
    data: unitHistory,
  });
}
