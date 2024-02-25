"use client";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { logout, selectAccessToken, selectAuthData } from "@/entities/User";
import { WEB_ROUTES } from "@/shared/routes";
import { Button, ButtonTheme } from "@/shared/ui";
import { useRouter } from "next/navigation";

export const ProfileBtns = () => {
	const isLoggedIn = !!useAppSelector(selectAccessToken);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const onLogoutClick = () => {
		dispatch(logout())
			.unwrap()
			.then(() => window.location.reload());
	};

	const onRegisterClick = () => {
		router.push(WEB_ROUTES.registration);
	};

	return (
		<div>
			{isLoggedIn && <Button onClick={onLogoutClick} theme={ButtonTheme.Link}>Выйти</Button>}
			{!isLoggedIn && (
				<div>
					<Button theme={ButtonTheme.Link}>Войти</Button>
					<Button onClick={onRegisterClick} theme={ButtonTheme.Link}>Регистрация</Button>
				</div>
			)}
		</div>
	);
};
