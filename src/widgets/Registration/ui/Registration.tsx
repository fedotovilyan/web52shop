"use client";
import { LoginFormInputs, LoginForm } from "@/features/LoginForm";
import cls from "./Registration.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectAuthData, startRegistration } from "@/entities/User";
import { useRouter } from "next/navigation";
import { WEB_ROUTES } from "@/shared/routes";
import { useEffect, useState } from "react";
import { Alert, Loader } from "@/shared/ui";
import { AlertType } from "@/shared/types/AlertType";
import { Divider } from "@/shared/ui/Divider/Divider";

export const Registration = () => {
	const { error, loading } = useAppSelector(selectAuthData);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [isSuccess, setIsSuccess] = useState(false);

	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				router.push(WEB_ROUTES.main);
			}, 1500);
		}
	}, [isSuccess]);

	const onSubmit = (data: LoginFormInputs) => {
		dispatch(startRegistration(data))
			.unwrap()
			.then(() => {
				setIsSuccess(true);
			})
			.catch(() => {});
	};

	return (
		<div className={cls.registration_wrapper}>
			<h2 className={cls.title}>Регистрация</h2>
			<Divider />
			<Loader spinning={loading}>
				{error && (
					<Alert type={AlertType.Error} className={cls.alert}>
						{error}
					</Alert>
				)}
				{isSuccess && (
					<Alert type={AlertType.Success} className={cls.alert}>
						Регистрация прошла успешно
					</Alert>
				)}
				<LoginForm className={cls.login_form} onFormSubmit={onSubmit} />
			</Loader>
		</div>
	);
};
