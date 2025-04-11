import { Field } from "@/lib/types/field";

const FIELDS: Field[] = [
  {
    id: 1,
    name: "Doğu Görevi",
    type: "Gözetleme",
    startTime: "2025-03-29T08:00:00Z",
    endTime: "2025-03-29T16:00:00Z",
    coordinates: [
      [30.5, 40.5],
      [30.6, 40.5],
      [30.6, 40.6],
      [30.5, 40.6],
      [30.5, 40.5],
    ],
  },
  {
    id: 2,
    name: "Batı Görevi",
    type: "Gözetleme",
    startTime: "2025-03-29T08:00:00Z",
    endTime: "2025-03-29T16:00:00Z",
    coordinates: [
      [30.7, 40.5],
      [30.8, 40.5],
      [30.8, 40.6],
      [30.7, 40.6],
      [30.7, 40.5],
    ],
  },
  {
    id: 3,
    name: "Güney Görevi",
    type: "Gözetleme",
    startTime: "2025-03-29T08:00:00Z",
    endTime: "2025-03-29T16:00:00Z",
    coordinates: [
      [30.4, 40.5],
      [30.5, 40.5],
      [30.5, 40.6],
      [30.4, 40.6],
      [30.4, 40.5],
    ],
  },
  {
    id: 4,
    name: "Kuzey Görevi",
    type: "Gözetleme",
    startTime: "2025-03-29T08:00:00Z",
    endTime: "2025-03-29T16:00:00Z",
    coordinates: [
      [30.9, 40.5],
      [31.0, 40.5],
      [31.0, 40.6],
      [30.9, 40.6],
      [30.9, 40.5],
    ],
  },
];

export async function GET() {
  return Response.json(FIELDS);
}
