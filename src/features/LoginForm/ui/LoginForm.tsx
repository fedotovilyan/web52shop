"use client";
import { Button, InputPhone, InputPassword } from "@/shared/ui";
import { ErrorText } from "@/shared/ui/ErrorText/ErrorText";
import { FC, FormHTMLAttributes } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import cls from "./LoginForm.module.scss";
import classNames from "classnames";
import { phoneRegexp } from "@/shared/constants";

export type LoginFormInputs = {
	phone: string;
	password: string;
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
			<div className={cls.phone_wrapper}>
				<label htmlFor="phone">Телефон:</label>
				<InputPhone
					id="phone"
					{...register("phone", {
						required: "Введите телефон!",
						maxLength: {
							value: 12,
							message: "Не больше 12 символов",
						},
						pattern: { value: phoneRegexp, message: "Некорректный телефон!" },
					})}
					aria-invalid={errors.phone ? "true" : "false"}
					className={classNames({
						[cls.err_input]: !!errors.phone,
					})}
					placeholder="Телефон"
				/>
				{errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
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
