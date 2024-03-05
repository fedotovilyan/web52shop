"use client";
import { SearchInput, SearchInputProps } from "@/shared/ui";
import { FC } from "react";
import cls from "./GlobalSearch.module.scss";

interface GlobalSearchProps extends SearchInputProps {}

export const GlobalSearch: FC<GlobalSearchProps> = (props) => {
	//TODO: realize global searching
	const onSearch = (search: string) => {};

	return (
		<SearchInput
			placeholder="Введите что-то для поиска"
			className={cls.global_search}
			onSearch={onSearch}
			{...props}
		/>
	);
};
