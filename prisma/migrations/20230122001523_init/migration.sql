/*
  Warnings:

  - Made the column `playlistid` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Song" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "privacy" BOOLEAN NOT NULL DEFAULT false,
    "playlistid" INTEGER NOT NULL,
    CONSTRAINT "Song_playlistid_fkey" FOREIGN KEY ("playlistid") REFERENCES "Playlist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Song" ("album", "artist", "duration", "genre", "id", "name", "playlistid", "privacy", "year") SELECT "album", "artist", "duration", "genre", "id", "name", "playlistid", "privacy", "year" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
