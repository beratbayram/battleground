import { UnitHistory } from "@/generated/prisma";
import { btPrisma } from "@/prisma/btPrisma";
import dayjs from "dayjs";

export async function getUnitHistory(unitId: number): Promise<UnitHistory[]> {
  const history = await btPrisma.unitHistory.findMany({
    where: {
      unitId,
    },
  });

  return history.sort((a, b) =>
    dayjs(a.timestamp).isAfter(dayjs(b.timestamp)) ? -1 : 1
  );
}
