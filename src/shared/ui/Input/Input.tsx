import { InputHTMLAttributes } from "react";
import classNames from "classnames";
import cls from "./Input.module.scss";

export enum InputType {
	Primary = "primary",
	Secondary = "secondary",
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	inputType?: InputType;
}

export const Input = (props: InputProps) => {
	const { inputType = InputType.Primary, className, ...rest } = props;

	return (
		<input
			className={classNames(cls.Input, cls[inputType], className)}
			placeholder="Hello world"
			{...rest}
		/>
	);
};
