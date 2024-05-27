-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addedById_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "address" DROP DEFAULT,
ALTER COLUMN "qad" DROP NOT NULL,
ALTER COLUMN "width" DROP NOT NULL,
ALTER COLUMN "arm" DROP NOT NULL,
ALTER COLUMN "cuff" DROP NOT NULL,
ALTER COLUMN "chest" DROP NOT NULL,
ALTER COLUMN "daman" DROP NOT NULL,
ALTER COLUMN "collar" DROP NOT NULL,
ALTER COLUMN "collarType" DROP NOT NULL,
ALTER COLUMN "pant" DROP NOT NULL,
ALTER COLUMN "pantCuff" DROP NOT NULL,
ALTER COLUMN "frontPocket" DROP NOT NULL,
ALTER COLUMN "frontPocket" SET DATA TYPE TEXT,
ALTER COLUMN "order" DROP NOT NULL,
ALTER COLUMN "order" DROP DEFAULT,
ALTER COLUMN "addedById" DROP NOT NULL,
ALTER COLUMN "addedById" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;