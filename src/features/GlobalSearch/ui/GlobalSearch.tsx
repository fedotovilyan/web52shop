"use client";
import { SearchInput, SearchInputProps } from "@/shared/ui";
import { FC } from "react";

interface GlobalSearch extends SearchInputProps {}

export const GlobalSearch: FC<GlobalSearch> = (props) => {

	//TODO: realize global searching
	const onSearch = (search: string) => {};

	return <SearchInput onSearch={onSearch} {...props} />;
};