"use client";

import { ChangeEventHandler, FC, KeyboardEventHandler, useState } from "react";
import { Input, InputProps } from "../Input";
import cls from "./SearchInput.module.scss";
import classNames from "classnames";
import SearchSvg from "@/shared/assets/icons/search.svg";
import { Button } from "../../Button/Button";

interface SearchInputProps extends InputProps {
	onSearch?: (value: string) => void;
	className?: string;
}

export const SearchInput: FC<SearchInputProps> = (props) => {
	const { onSearch, className, onChange, ...rest } = props;
	const [value, setValue] = useState("");

	const onKeyDownInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === "Enter") onSearch?.(value);
	};

	const onIconClick = () => {
		onSearch?.(value);
	};

	const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.target.value);
		onChange?.(e);
	};

	return (
		<div className={cls.search_input_container}>
			<Input
				{...rest}
				className={classNames(cls.input, className)}
				onKeyDown={onKeyDownInput}
				value={value}
				onChange={onChangeInput}
			/>
			<Button type="button" onClick={onIconClick} className={cls.search_btn}>
				<SearchSvg
					fill={"#48ceffe4"}
					className={cls.icon}
					alt=""
					height={25}
					width={25}
				/>
			</Button>
		</div>
	);
};
