"use client";

import classNames from "classnames";
import { ChangeEventHandler, FC, HTMLAttributes } from "react";
import cls from "./Select.module.scss";

export interface SelectItem {
	label: string;
	key: string | number;
	value: string | number;
}

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
	items: SelectItem[];
}

export const Select: FC<SelectProps> = (props) => {
	const { className, items, ...rest } = props;

	const onSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
		const value = e.target.value;
		console.log(value);
	};

	return (
		<select onChange={onSelectChange} className={classNames(cls.select, className)} {...rest}>
			<div className={cls.items}>
				{items.map((item) => (
					<option className={cls.item} key={item.key} value={item.value}>
						{item.label}
					</option>
				))}
			</div>
		</select>
	);
};
