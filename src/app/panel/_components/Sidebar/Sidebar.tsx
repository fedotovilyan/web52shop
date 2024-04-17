import cls from "./Sidebar.module.scss";
import classNames from "classnames";
import AddCardSvg from "@/shared/assets/icons/card-add.svg";
import CatalogSvg from "@/shared/assets/icons/list.svg";
import { WEB_ROUTES } from "@/shared/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
	{
		label: "Генератор товаров",
		path: WEB_ROUTES.adminPanel.cardGenerator,
		icon: <AddCardSvg className={cls.icon} alt="" height={35} width={35} />,
	},
	{
		label: "Генератор тегов",
		path: WEB_ROUTES.adminPanel.tagGenerator,
		icon: <CatalogSvg className={cls.icon} alt="" height={35} width={35} />,
	},
];

export const Sidebar = ({
	collapsed,
	className,
}: {
	collapsed: boolean;
	className?: string;
}) => {
	const pathname = usePathname();
	return (
		<div
			className={classNames(
				cls.sidebar,
				{ [cls.collapsed]: collapsed },
				className
			)}
		>
			<div className={cls.items}>
				{items.map((item) => {
					return (
						<Link
							href={item.path}
							key={item.path}
							className={classNames(cls.item, {
								[cls.active]: pathname === item.path,
							})}
						>
							<div className={cls.item_icon}>{item.icon}</div>
							<span className={cls.item_label}>{item.label}</span>
						</Link>
					);
				})}
			</div>
		</div>
	);
};
