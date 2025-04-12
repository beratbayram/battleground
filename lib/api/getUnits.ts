import { Unit } from "../types/unit";
import { btFetch } from "../utils/btFetch";

export async function getUnits() {
  return await btFetch<Unit[]>("/units");
}