import Image from "next/image";
import cls from "./Sidebar.module.scss";
import classNames from "classnames";

export const Sidebar = ({
	collapsed,
	className,
}: {
	collapsed: boolean;
	className?: string;
}) => {
	return (
		<div
			className={classNames(
				cls.sidebar,
				{ [cls.collapsed]: collapsed },
				className
			)}
		>
			<div className={cls.items}></div>
		</div>
	);
};
