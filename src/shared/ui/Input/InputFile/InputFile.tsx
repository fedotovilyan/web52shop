"use client";

import { FC, forwardRef, useId } from "react";
import { Input, InputProps } from "../Input";
import cls from "./InputFile.module.scss";
import classNames from "classnames";
import UploadSvg from "@/shared/assets/icons/upload.svg";

interface InputFileProps extends InputProps {
	label?: string;
}

export const InputFile: FC<InputFileProps> = forwardRef<
	HTMLInputElement,
	InputFileProps
>(function InputFile(props, ref) {
	const { className, label = "Выберите файл", id, disabled, ...rest } = props;
	const inputId = useId();

	return (
		<div className={cls.input_file_wrapper}>
			<Input
				ref={ref}
				id={id || inputId}
				className={classNames(cls.input_file, className)}
				{...rest}
			/>
			{!disabled && (
				<label htmlFor={id || inputId}>
					{label}{" "}
					<UploadSvg className={cls.icon} alt="" height={25} width={25} />
				</label>
			)}
		</div>
	);
});
