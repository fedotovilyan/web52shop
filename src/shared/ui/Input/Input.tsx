import { InputHTMLAttributes } from "react";
import classNames from "classnames";
import cls from "./Input.module.scss";
import { forwardRef } from "react";

export enum InputTheme {
	Primary = "primary",
	Secondary = "secondary",
	Dashed = "dashed",
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	theme?: InputTheme;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	props: InputProps,
	ref
) {
	const { theme = InputTheme.Primary, className, ...rest } = props;

	return (
		<input
			ref={ref}
			className={classNames(cls.Input, cls[theme], className)}
			{...rest}
		/>
	);
});
