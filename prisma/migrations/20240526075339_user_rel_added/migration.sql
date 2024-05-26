/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "address" SET DEFAULT '',
ALTER COLUMN "order" SET DEFAULT '',
ALTER COLUMN "addedById" SET DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "Order_phone_key" ON "Order"("phone");
