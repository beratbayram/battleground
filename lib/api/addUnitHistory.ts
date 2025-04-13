"use server";

import "server-only";
import { btPrisma } from "@/prisma/btPrisma";
import { UnitHistory } from "@/generated/prisma";

export async function addUnitHistory(
  unitHistory: Omit<UnitHistory, "id">
): Promise<void> {
  await btPrisma.unitHistory.create({
    data: unitHistory,
  });
}
