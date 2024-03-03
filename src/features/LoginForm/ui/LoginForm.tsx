"use client";
import { Button, Input, InputPassword } from "@/shared/ui";
import { ErrorText } from "@/shared/ui/ErrorText/ErrorText";
import { FC, FormHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import cls from "./LoginForm.module.scss";
import classNames from "classnames";
import { emailRegexp } from "@/shared/constants";

export type LoginFormInputs = {
	password: string;
	email: string;
};

interface LoginFormProps extends FormHTMLAttributes<HTMLFormElement> {
	onFormSubmit: (data: LoginFormInputs) => void;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
	const { onFormSubmit, ...rest } = props;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>();

	return (
		<form
			className={cls.login_form}
			onSubmit={handleSubmit(onFormSubmit)}
			{...rest}
		>
			<div className={cls.email_wrapper}>
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
			<div className={cls.pass_wrapper}>
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
					placeholder="Пароль"
				/>
				{errors.password && <ErrorText>{errors.password.message}</ErrorText>}
			</div>
			<Button className={cls.submit_btn} type="submit">
				Далее
			</Button>
		</form>
	);
};
