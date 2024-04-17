"use client";

import { Loader, Select, SelectItem, SelectWithSearch } from "@/shared/ui";
import { CategoryFilters, useCategories } from "../../hooks/useCategories";
import { useState } from "react";

export const CategorySelector = () => {
  const [filters, setFilters] = useState<CategoryFilters>({
    count: 10,
    search: "",
  });
  const { categories, loading, error } = useCategories(filters);
  const items: SelectItem[] = categories.map((val) => ({
    key: val.id,
    label: val.name,
    value: val.id,
  }));

  return (
    <Loader spinning={loading}>
      <SelectWithSearch options={items} />
    </Loader>
  );
};
