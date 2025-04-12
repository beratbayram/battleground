const BASE_URL = process.env.SERVER_BASE_URL;

export async function btFetch<T>(url: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`);
  return await res.json();
}
