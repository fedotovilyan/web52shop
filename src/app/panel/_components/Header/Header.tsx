"use client";

import { FC } from "react";
import cls from "./Header.module.scss";
import Image from "next/image";
import { useAppSelector } from "@/app/store";
import { selectProfileData } from "@/entities/User";
import { UserRole } from "@/shared/models/User";
import { Button, ButtonTheme } from "@/shared/ui";
import CollapseSvg from "@/shared/assets/icons/move-left.svg";
import UncollapseSvg from "@/shared/assets/icons/move-right.svg";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { WEB_ROUTES } from "@/shared/routes";

const userRoleLabel = {
	[UserRole.Admin]: "Администратор",
	[UserRole.Visitor]: "",
};

interface HeaderProps {
	collapsed: boolean;
	setCollapsed: (val: boolean) => void;
	className?: string;
}

export const Header: FC<HeaderProps> = ({
	collapsed,
	setCollapsed,
	className,
}) => {
	const user = useAppSelector(selectProfileData);
	const router = useRouter();

	return (
		<header className={classNames(cls.header, className)}>
			<div className={cls.header_start}>
				<Button
					className={cls.collapse_btn}
					onClick={() => setCollapsed(!collapsed)}
					theme={ButtonTheme.Transparent}
				>
					{collapsed ? (
						<UncollapseSvg fill="#1758fce1" width={25} height={25} alt="" />
					) : (
						<CollapseSvg fill="#1758fce1" width={25} height={25} alt="" />
					)}
				</Button>
				<Button
					onClick={() => router.push(WEB_ROUTES.adminPanel.main)}
					className={cls.logo}
					theme={ButtonTheme.Transparent}
				>
					<Image width={50} height={50} src={"/logo.png"} alt="" />
				</Button>
			</div>
			<div className={cls.user}>
				<span>
					{user.first_name} {user.last_name}
				</span>
				{user.role && <span>{userRoleLabel[user.role]}</span>}
			</div>
		</header>
	);
};
