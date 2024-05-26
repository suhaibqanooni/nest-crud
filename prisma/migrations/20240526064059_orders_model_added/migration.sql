-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "qad" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "arm" INTEGER NOT NULL,
    "cuff" INTEGER NOT NULL,
    "chest" INTEGER NOT NULL,
    "daman" INTEGER NOT NULL,
    "collar" INTEGER NOT NULL,
    "collarType" TEXT NOT NULL,
    "pant" INTEGER NOT NULL,
    "pantCuff" INTEGER NOT NULL,
    "frontPocket" BOOLEAN NOT NULL,
    "order" TEXT NOT NULL,
    "addedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
