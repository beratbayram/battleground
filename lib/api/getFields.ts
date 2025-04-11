import { Field } from "../types/field";
import { btFetch } from "../utils/btFetch";

export async function getFields() {
  return await btFetch<Field[]>("/fields");
}