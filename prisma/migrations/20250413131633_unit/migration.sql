-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Field" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL
);
INSERT INTO "new_Field" ("coordinates", "endTime", "id", "name", "startTime", "type") SELECT "coordinates", "endTime", "id", "name", "startTime", "type" FROM "Field";
DROP TABLE "Field";
ALTER TABLE "new_Field" RENAME TO "Field";
CREATE TABLE "new_Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "speed" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "fieldId" INTEGER
);
INSERT INTO "new_Unit" ("course", "fieldId", "id", "name", "speed") SELECT "course", "fieldId", "id", "name", "speed" FROM "Unit";
DROP TABLE "Unit";
ALTER TABLE "new_Unit" RENAME TO "Unit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
