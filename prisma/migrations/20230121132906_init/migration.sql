/*
  Warnings:

  - You are about to drop the column `private` on the `Song` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Song" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "playlistid" INTEGER NOT NULL,
    "isprivate" BOOLEAN DEFAULT false,
    CONSTRAINT "Song_playlistid_fkey" FOREIGN KEY ("playlistid") REFERENCES "Playlist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Song" ("album", "artist", "duration", "genre", "id", "name", "playlistid", "year") SELECT "album", "artist", "duration", "genre", "id", "name", "playlistid", "year" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
