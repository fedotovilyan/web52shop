import { GetCategoriesRequestDTO } from "./dto/GetCategoriesRequest.dto";
import { APP_URL } from "@/shared/constants";
import { API_ROUTES } from "@/shared/routes";
import { CategoriesApiResponseDTO } from "@/app/api/category/dto";

export async function GetCategories(filters: GetCategoriesRequestDTO) {
  const search = new URLSearchParams();

  if (filters.count) search.set("count", filters.count.toString());
  if (filters.search) search.set("count", filters.search);

  const res = await fetch(`${APP_URL}${API_ROUTES.getCategories}?${search}`, {
    method: "GET",
    next: {
      tags: ["category"],
    },
  });

  const body = (await res.json()) as CategoriesApiResponseDTO;

  if (!body.ok) {
    throw new Error(body.message);
  }

  return body.data;
}
