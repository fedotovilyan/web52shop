"use client";
import { Button, ErrorText, Input, InputPassword } from "@/shared/ui";
import { FC, FormHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import cls from "./LoginForm.module.scss";
import classNames from "classnames";
import { emailRegexp } from "@/shared/constants";

export type LoginFormInputs = {
	confirm_password?: string;
	password: string;
	email: string;
};

interface LoginFormProps extends FormHTMLAttributes<HTMLFormElement> {
	onFormSubmit: (data: LoginFormInputs) => void;
	isRegistration?: boolean;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
	const { onFormSubmit, isRegistration, ...rest } = props;

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
		watch
	} = useForm<LoginFormInputs>();
	const password = watch('password');

	return (
		<form
			className={cls.login_form}
			onSubmit={handleSubmit(onFormSubmit)}
			{...rest}
		>
			<div className={cls.form_item}>
				<label htmlFor="email">Email:</label>
				<Input
					id="email"
					{...register("email", {
						required: "Введите email!",
						maxLength: {
							value: 255,
							message: "Не больше 255 символов",
						},
						pattern: { value: emailRegexp, message: "Некорректный email!" },
					})}
					aria-invalid={errors.email ? "true" : "false"}
					className={classNames({
						[cls.err_input]: !!errors.email,
					})}
					placeholder="Email"
				/>
				{errors.email && <ErrorText>{errors.email.message}</ErrorText>}
			</div>
			<div className={cls.form_item}>
				<label htmlFor="password">Пароль:</label>
				<InputPassword
					id="password"
					{...register("password", {
						required: "Введите пароль!",
						maxLength: {
							value: 250,
							message: "Не больше 250 символов",
						},
						minLength: {
							value: 6,
							message: "Пароль должен содержать минимум 6 символов",
						},
					})}
					className={classNames({
						[cls.password_input]: true,
						[cls.err_input]: !!errors.password,
					})}
					aria-invalid={errors.password ? "true" : "false"}
					autoComplete={isRegistration ? "new-password" : undefined}
					placeholder="Пароль"
				/>
				{errors.password && <ErrorText>{errors.password.message}</ErrorText>}
			</div>
			{isRegistration && (
				<div className={cls.form_item}>
					<label htmlFor="confirm_password">Подтвердить пароль:</label>
					<InputPassword
						id="confirm_password"
						{...register("confirm_password", {
							required: "Подтвердите пароль!",
						})}
						className={classNames({
							[cls.password_input]: true,
							[cls.err_input]: !!errors.confirm_password,
						})}
						aria-invalid={errors.confirm_password ? "true" : "false"}
						placeholder="Подтвердить пароль"
						autoComplete={isRegistration ? "new-password" : undefined}
						onChange={(e) => {
							const value = e.target.value;
							if (value !== password) {
								setError("confirm_password", {
									message: "Пароли не совпадают",
								});
							} else {
								clearErrors("confirm_password");
							}
						}}
					/>
					{errors.confirm_password && (
						<ErrorText>{errors.confirm_password.message}</ErrorText>
					)}
				</div>
			)}
			<Button className={cls.submit_btn} type="submit">
				Далее
			</Button>
		</form>
	);
};
