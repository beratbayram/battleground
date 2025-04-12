import { Unit } from "../types/unit";

const UNITS: Unit[] = [
  {
    id: 0,
    name: "Tank-1",
    speed: "10.0",
    course: "180.0",
  },
  {
    id: 1,
    name: "Tank-2",
    speed: "10.0",
    course: "180.0",
  },
  {
    id: 2,
    name: "Tank-3",
    speed: "15.0",
    course: "90.0",
  },
  {
    id: 3,
    name: "Tank-4",
    speed: "20.0",
    course: "270.0",
  },
  {
    id: 4,
    name: "Tank-5",
    speed: "25.0",
    course: "360.0",
  },
];

export async function getUnits(): Promise<Unit[]> {
  return await Promise.resolve(UNITS);
}
