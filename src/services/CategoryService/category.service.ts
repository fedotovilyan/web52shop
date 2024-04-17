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
        main_categories: {
          include: {
            primary_category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        sub_categories: {
          include: {
            secondary_category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }
}
