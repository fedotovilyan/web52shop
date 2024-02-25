"use client";
import {
	ChangeEventHandler,
	FC,
	KeyboardEventHandler,
	forwardRef,
	useEffect,
	useState,
} from "react";
import { Input, InputProps } from "../Input";
import { phoneRegexp } from "@/shared/constants";

interface InputPhoneProps extends InputProps {
	initialValue?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const InputPhone: FC<InputPhoneProps> = forwardRef<
	HTMLInputElement,
	InputPhoneProps
>((props, ref) => {
	const { onChange, initialValue, ...rest } = props;

	const [value, setValue] = useState("");

	const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const val = e.target.value;
		if (val.length > 12) return;

		if (val.charAt(0) === "8") {
			setValue("+7");
		} else {
			setValue(val);
		}

		onChange?.(e);
	};

	useEffect(() => {
		if (initialValue) {
			setValue(initialValue);
		}
	}, [initialValue]);

	return (
		<Input
			value={value}
			type="tel"
			onChange={onInputChange}
			ref={ref}
			{...rest}
		/>
	);
});
