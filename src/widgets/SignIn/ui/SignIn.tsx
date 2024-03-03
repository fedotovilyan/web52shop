"use client";

import { LoginForm, LoginFormInputs } from "@/features/LoginForm";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import cls from "./SignIn.module.scss";
import { Alert, Divider, Loader } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectAuthData, signIn } from "@/entities/User";
import { AlertType } from "@/shared/types/AlertType";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { WEB_ROUTES } from "@/shared/routes";

interface SignInProps extends HTMLAttributes<HTMLDivElement> {}

export const SignIn: FC<SignInProps> = (props) => {
	const { className } = props;
	const [isSuccess, setIsSuccess] = useState(false);
	const { error, loading } = useAppSelector(selectAuthData);
	const router = useRouter();
	const dispatch = useAppDispatch();

	const onFormSubmit = (data: LoginFormInputs) => {
		dispatch(signIn(data))
			.unwrap()
			.then(() => {
				setIsSuccess(true);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				router.push(WEB_ROUTES.main);
			}, 500);
		}
	}, [isSuccess, router]);

	return (
		<div className={classNames(cls.SignIn, className)}>
			<h2 className={cls.title}>Авторизация</h2>
			<Divider />
			<Loader spinning={loading}>
				{error && (
					<Alert type={AlertType.Error} className={cls.alert} closable>
						{error}
					</Alert>
				)}
				{isSuccess && (
					<Alert type={AlertType.Success} className={cls.alert} closable>
						Авторизация прошла успешно
					</Alert>
				)}
				<LoginForm className={cls.login_form} onFormSubmit={onFormSubmit} />
			</Loader>
		</div>
	);
};
