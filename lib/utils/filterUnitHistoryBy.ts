import { UnitHistory } from "@/generated/prisma";

export function filterUnitHistoryBy(id: number, unitHistory: UnitHistory[]) {
  return unitHistory
    .filter((history) => history.unitId === id)
    .map((history) => [history.lat, history.lng] as [number, number]);
}
