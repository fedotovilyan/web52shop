"use client";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { logout, selectProfile } from "@/entities/User";
import { WEB_ROUTES } from "@/shared/routes";
import { Button, ButtonTheme } from "@/shared/ui";
import { useRouter } from "next/navigation";
import cls from "./ProfileDropdown.module.scss";
import { DropDown, DropdownItem } from "@/shared/ui/DropDown/DropDown";
import { useState } from "react";
import { ProfileFormModal } from "@/features/ProfileFormModal";

export const ProfileDropdown = () => {
	const {
		profileData: { email },
	} = useAppSelector(selectProfile);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [showDropdown, setShowDropdown] = useState(false);
	const [isProfileModalOpened, setIsProfileModalOpened] = useState(false);

	const onLogoutClick = () => {
		dispatch(logout())
			.unwrap()
			.then(() => window.location.reload());
	};

	const onProfileClick = () => {
		setIsProfileModalOpened(true);
	};

	const dropDownItems: DropdownItem[] = [
		{
			key: "profile",
			item: (
				<Button
					className={cls.logout_btn}
					onClick={onProfileClick}
					theme={ButtonTheme.Link}
				>
					Профиль
				</Button>
			),
		},
		{
			key: "logout",
			item: (
				<Button
					className={cls.logout_btn}
					onClick={onLogoutClick}
					theme={ButtonTheme.Link}
				>
					Выйти
				</Button>
			),
		},
	];

	const onRegisterClick = () => {
		router.push(WEB_ROUTES.registration);
	};

	const onSignInClick = () => {
		router.push(WEB_ROUTES.login);
	};

	return (
		<div className={cls.profile_btns}>
			{email && (
				<DropDown
					showItems={showDropdown}
					setShowItems={setShowDropdown}
					items={dropDownItems}
					showIcon
				>
					<Button theme={ButtonTheme.Link}>{email}</Button>
				</DropDown>
			)}
			{!email && (
				<div className={cls.log_btns}>
					<Button onClick={onSignInClick} theme={ButtonTheme.Link}>
						Войти
					</Button>
					<Button onClick={onRegisterClick} theme={ButtonTheme.Link}>
						Регистрация
					</Button>
				</div>
			)}
			<ProfileFormModal
				isOpen={isProfileModalOpened}
				onClose={() => {
					setIsProfileModalOpened(false);
				}}
			/>
		</div>
	);
};
