/*
  Warnings:

  - A unique constraint covering the columns `[secondary_category_id]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_primary_category_id_fkey";

-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_secondary_category_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_secondary_category_id_key" ON "SubCategory"("secondary_category_id");

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_primary_category_id_fkey" FOREIGN KEY ("primary_category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_secondary_category_id_fkey" FOREIGN KEY ("secondary_category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
