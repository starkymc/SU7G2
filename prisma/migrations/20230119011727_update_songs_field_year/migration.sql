/*
  Warnings:

  - You are about to alter the column `year` on the `Songs` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Songs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "privacy" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Songs" ("album", "artist", "duration", "genre", "id", "name", "privacy", "year") SELECT "album", "artist", "duration", "genre", "id", "name", "privacy", "year" FROM "Songs";
DROP TABLE "Songs";
ALTER TABLE "new_Songs" RENAME TO "Songs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
