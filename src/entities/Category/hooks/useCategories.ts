import { useEffect, useState } from "react";
import { ICategory } from "../types/ICategory";
import { GetCategories } from "@/shared/api/Category";

export interface CategoryFilters {
	search?: string;
	count?: number;
}

export const useCategories = (filters: CategoryFilters) => {
	const [categories, setCategories] = useState<ICategory[]>([
    { id: 1, name: "test1", main_categories: [], sub_categories: [] },
    { id: 2, name: "test2", main_categories: [], sub_categories: [] },
  ]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		if (filters.search) {
			setLoading(true);
			GetCategories(filters)
				.then(setCategories)
				.catch((e) => {
					setError(e.message);
				})
				.finally(() => setLoading(false));
		}
	}, [filters]);

	return { categories, loading, error };
};