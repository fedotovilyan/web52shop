import { ICategory } from "@/entities/Category/types/ICategory";

export type CategoriesApiResponseDTO =
  | {
      ok: true;
      data: ICategory[];
    }
  | { ok: false; message: string };
