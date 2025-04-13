"use server";

import { Unit } from "@/generated/prisma";
import { btPrisma } from "@/prisma/btPrisma";
import "server-only";

export async function removeUnit(id: Unit["id"]): Promise<void> {
  await btPrisma.unit.delete({
    where: {
      id,
    },
  });
}

