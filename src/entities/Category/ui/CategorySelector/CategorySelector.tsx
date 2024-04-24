"use client";

import {
  Loader,
  SelectOption,
  SelectWithSearch,
  Notification,
} from "@/shared/ui";
import { CategoryFilters, useCategories } from "../../hooks/useCategories";
import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";

export const CategorySelector = () => {
  const [filters, setFilters] = useState<CategoryFilters>({
    count: 10,
    search: "",
  });
  const { categories, loading, error, setError } = useCategories(filters);
  const items: SelectOption[] = categories.map((val) => ({
    key: val.id,
    label: val.name,
    value: val.id,
  }));

  const onSearch = useDebounce(
    (value: string) => setFilters((prev) => ({ ...prev, search: value })),
    500
  );

  return (
    <>
      <Loader spinning={loading}>
        <SelectWithSearch placeholder="Введите категорию" options={items} onSearch={onSearch} />
      </Loader>
      <Notification
        isOpen={!!error}
        type="error"
        duration={2500}
        closable
        onClose={() => setError(null)}
      >
        {error}
      </Notification>
    </>
  );
};
