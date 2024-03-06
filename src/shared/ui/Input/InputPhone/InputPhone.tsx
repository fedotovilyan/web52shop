"use client";
import { ChangeEventHandler, FC, forwardRef, useEffect, useState } from "react";
import { Input, InputProps } from "../Input";

interface InputPhoneProps extends InputProps {
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const InputPhone: FC<InputPhoneProps> = forwardRef<
	HTMLInputElement,
	InputPhoneProps
>(function InputPhone(props, ref) {
	const { onChange, ...rest } = props;

	const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const val = e.target.value;
		if (val.length > 12) return;

		if (val.charAt(0) === "8") {
			e.target.value = "+7" + (e.target.value.slice(1) || "");
		}
		onChange?.(e);
	};

	return (
		<Input
			type="tel"
			onChange={onInputChange}
			ref={ref}
			{...rest}
		/>
	);
});
