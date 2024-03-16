"use client";

import { FC, FormHTMLAttributes, useEffect } from "react";
import cls from "./ProfileForm.module.scss";
import { emailRegexp, phoneRegexp } from "@/shared/constants";
import { Input, ErrorText, Button, InputPhone } from "@/shared/ui";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { IUser } from "@/shared/models/User";

export type ProfileFormInputs = Pick<
	IUser,
	"email" | "first_name" | "last_name" | "phone"
>;

interface ProfileFormProps extends FormHTMLAttributes<HTMLFormElement> {
	onFormSubmit: (data: ProfileFormInputs) => void;
	initialValues?: Partial<ProfileFormInputs>;
}

export const ProfileForm: FC<ProfileFormProps> = (props) => {
	const { onFormSubmit, initialValues, ...rest } = props;
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<ProfileFormInputs>();

	useEffect(() => {
		if (initialValues) {
			Object.entries(initialValues).forEach(([key, val]) => {
				setValue(key as keyof ProfileFormInputs, val, { shouldValidate: true });
			});
		}
	}, [initialValues, setValue]);

	return (
		<form
			className={cls.profile_form}
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
				<label htmlFor="first_name">Имя:</label>
				<Input
					id="first_name"
					{...register("first_name", {
						maxLength: {
							value: 127,
							message: "Не больше 127 символов",
						},
					})}
					className={classNames({
						[cls.password_input]: true,
						[cls.err_input]: !!errors.first_name,
					})}
					aria-invalid={errors.first_name ? "true" : "false"}
					placeholder="Имя"
				/>
				{errors.first_name && (
					<ErrorText>{errors.first_name.message}</ErrorText>
				)}
			</div>
			<div className={cls.form_item}>
				<label htmlFor="last_name">Фамилия:</label>
				<Input
					id="last_name"
					{...register("last_name", {
						maxLength: {
							value: 127,
							message: "Не больше 127 символов",
						},
					})}
					className={classNames({
						[cls.password_input]: true,
						[cls.err_input]: !!errors.last_name,
					})}
					aria-invalid={errors.last_name ? "true" : "false"}
					placeholder="Фамилия"
				/>
				{errors.last_name && <ErrorText>{errors.last_name.message}</ErrorText>}
			</div>
			<div className={cls.form_item}>
				<label htmlFor="phone">Телефон:</label>
				<InputPhone
					id="phone"
					{...register("phone", {
						maxLength: {
							value: 12,
							message: "Не больше 12 символов",
						},
						pattern: { value: phoneRegexp, message: "Некорректный телефон!" },
					})}
					className={classNames({
						[cls.password_input]: true,
						[cls.err_input]: !!errors.phone,
					})}
					aria-invalid={errors.phone ? "true" : "false"}
					placeholder="Телефон"
				/>
				{errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
			</div>
			<Button className={cls.submit_btn} type="submit">
				Обновить
			</Button>
		</form>
	);
};
