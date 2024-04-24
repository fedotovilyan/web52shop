import { prisma } from "@prisma";

export class CategoryService {
  static async getCategories({
    search,
    count,
  }: {
    search?: string;
    count?: number;
  }) {
    return prisma.category.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      take: count,
      select: {
        id: true,
        name: true,
      },
    });
  }
}
