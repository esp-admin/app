-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "description" TEXT,
    "variables" TEXT,
    "status" TEXT NOT NULL DEFAULT 'unregistered',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "projectId" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Device_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("apiKey", "createdAt", "description", "id", "name", "projectId", "status", "updatedAt", "userId", "variables") SELECT "apiKey", "createdAt", "description", "id", "name", "projectId", "status", "updatedAt", "userId", "variables" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
CREATE UNIQUE INDEX "Device_name_userId_key" ON "Device"("name", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
