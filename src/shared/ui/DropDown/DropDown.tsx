"use client";

import {
	FC,
	PropsWithChildren,
	ReactNode,
	useRef,
} from "react";
import cls from "./DropDown.module.scss";
import classNames from "classnames";
import DownArrowSvg from "@/shared/assets/icons/down-arrow.svg";
import UpArrowSvg from "@/shared/assets/icons/up-arrow.svg";

export interface DropdownItem {
	item: ReactNode;
	key: string;
}

interface DropDownProps extends PropsWithChildren {
	items: DropdownItem[];
	showItemsWhen?: "hovered";
	showItems: boolean;
	setShowItems: (value: boolean) => void;
}

export const DropDown: FC<DropDownProps> = (props) => {
	const {
		children,
		items,
		setShowItems,
		showItems,
		showItemsWhen = "hovered",
	} = props;
	const closeDropdownTimeout = useRef<
		ReturnType<typeof setTimeout> | undefined
	>();

	//TODO: realize click
	/* const onClick = () => {
		if (showItemsWhen !== "clicked") return;
		setShowItems(true);
		setTimeout(() => {
			console.log(isHovered);
			if (!isHovered) {
				setShowItems(false);
			} else {
				setHideWhenMouseOut(true);
			}
		}, 2000);
	}; */

	const onMouseOver = () => {
		if (showItemsWhen !== "hovered") return;
		setShowItems(true);
		clearTimeout(closeDropdownTimeout.current);
	};

	const onMouseOut = () => {
		if (showItemsWhen !== "hovered") return;
		closeDropdownTimeout.current = setTimeout(() => {
			setShowItems(false);
		}, 350);
	};

	return (
		<div
			className={cls.dropdown_container}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
		>
			<div className={cls.children}>
				{children}
				{showItems ? (
					<UpArrowSvg
						className={cls.icon}
						alt=""
						fill="#487cffe1"
						height={20}
						width={20}
					/>
				) : (
					<DownArrowSvg
						className={cls.icon}
						alt=""
						fill="#487cffe1"
						height={20}
						width={20}
					/>
				)}
			</div>
			<div
				className={classNames(cls.items, {
					[cls.opened]: showItems,
				})}
			>
				{items.map(({ item, key }) => (
					<div key={key} className={cls.item}>
						{item}
					</div>
				))}
			</div>
		</div>
	);
};
