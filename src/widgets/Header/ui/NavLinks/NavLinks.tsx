"use client";

import { WEB_ROUTES } from "@/shared/routes";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { FC } from "react";
import cls from "./NavLinks.module.scss";
import { ButtonLink } from "@/shared/ui";

const items = [
	{
		label: "Главная",
		href: WEB_ROUTES.main,
	},
	{
		label: "Подробнее о нас",
		href: WEB_ROUTES.about,
	},
];

interface NavLinksProps {
	className?: string;
}

export const NavLinks: FC<NavLinksProps> = ({ className }) => {
	const pathname = usePathname();

	return (
		<div className={classNames(cls.NavLinks, className)}>
			{items.map((item) => (
				<ButtonLink
					href={item.href}
					key={item.label}
					className={classNames({
						[cls.current]: pathname === item.href,
						[cls.link]: true,
					})}
				>
					{item.label}
				</ButtonLink>
			))}
		</div>
	);
};
