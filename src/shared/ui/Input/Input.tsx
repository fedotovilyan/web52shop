import { InputHTMLAttributes, RefObject } from "react";
import classNames from "classnames";
import cls from "./Input.module.scss";
import { forwardRef } from "react";

export enum InputType {
	Primary = "primary",
	Secondary = "secondary",
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	inputType?: InputType;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(props: InputProps, ref) => {
		const { inputType = InputType.Primary, className, ...rest } = props;

		return (
			<input
				ref={ref}
				className={classNames(cls.Input, cls[inputType], className)}
				{...rest}
			/>
		);
	}
);
