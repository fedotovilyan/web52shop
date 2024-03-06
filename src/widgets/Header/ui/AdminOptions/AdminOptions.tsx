"use client";

import { useAppSelector } from "@/app/store";
import { UserRole, selectProfile } from "@/entities/User";
import { FC } from "react";
import cls from "./AdminOptions.module.scss";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";
import { WEB_ROUTES } from "@/shared/routes";

export const AdminOptions: FC = () => {
	const {
		profileData: { role },
	} = useAppSelector(selectProfile);
	const router = useRouter();

	if (role !== UserRole.Admin) return null;

	return (
		<div className={cls.admin_options_container}>
			<Button
				onClick={() => router.push(WEB_ROUTES.adminPanel.main)}
				className={cls.btn}
			>
				В админ панель
			</Button>
		</div>
	);
};
