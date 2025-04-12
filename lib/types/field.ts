export const FIELD_TYPES = [
  "Gözetleme",
  "İzleme",
  "Saldırı",
  "Savunma",
  "Keşif",
  "Eğitim",
] as const;

export interface Field {
  id: number;
  name: string;
  type: typeof FIELD_TYPES[number];
  startTime: string;
  endTime: string;
  coordinates: number[][];
}

/*
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
};
*/
