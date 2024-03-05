"use client";

import { FC, forwardRef, useState } from "react";
import { Input, InputProps } from "../Input";
import cls from "./InputPassword.module.scss";
import HideSvg from "@/shared/assets/icons/hide.svg";
import VisibleSvg from "@/shared/assets/icons/visible.svg";
import classNames from "classnames";
import { Button } from "../..";

interface InputPasswordProps extends InputProps {}

export const InputPassword: FC<InputPasswordProps> = forwardRef<
	HTMLInputElement,
	InputProps
>(function InputPassword(props, ref) {
	const { className, ...rest } = props;

	const [visible, setVisible] = useState(false);

	const onIconClick = () => {
		setVisible((prev) => !prev);
	};

	return (
		<div className={cls.input_wrapper}>
			<Input
				ref={ref}
				type={visible ? "text" : "password"}
				className={classNames(cls.input, className)}
				{...rest}
			/>
			<Button
				type="button"
				onClick={onIconClick}
				className={cls.visible_toggle_btn}
			>
				{visible ? (
					<VisibleSvg
						className={cls.icon}
						alt=""
						fill="#48ceffe4"
						height={25}
						width={25}
					/>
				) : (
					<HideSvg
						className={cls.icon}
						alt=""
						fill="#48ceffe4"
						height={25}
						width={25}
					/>
				)}
			</Button>
		</div>
	);
});
