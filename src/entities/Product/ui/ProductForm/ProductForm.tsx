"use client";

import { Button, Divider, ErrorText, Input, InputTheme } from "@/shared/ui";
import cls from "./ProductForm.module.scss";
import { FC } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { IFile, useFiles } from "@/shared/hooks/useFiles";
import { InputFile } from "@/shared/ui/Input/InputFile/InputFile";
import { MediaPreview } from "./MediaPreview/MediaPreview";
import { CategorySelector } from "@/entities/Category";

export interface ProductFormInputs {
	title: string;
	description: string;
	files?: FileList;
}

export type ProductFormData = Omit<ProductFormInputs, "files"> & {
	files: IFile[];
};

interface ProductFormProps {
	className?: string;
	onFormSubmit: (data: ProductFormData) => void;
	isEdit?: boolean;
}

export const ProductForm: FC<ProductFormProps> = (props) => {
	const { className, onFormSubmit, isEdit } = props;

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<ProductFormInputs>();

	const formFiles = watch("files");
	const { files, setFiles } = useFiles(formFiles);

	return (
		<form
			className={classNames(cls.product_form, className)}
			onSubmit={handleSubmit((data) => onFormSubmit({...data, files }))}
		>
			<div className={cls.save_btn_wrapper}>
				<Button className={cls.save_btn} type="submit">
					Сохранить
				</Button>
			</div>
			<Divider style={{ marginBottom: "40px" }} />
			<div>
				<CategorySelector />
			</div>
			<div>
				<Input
					id="title"
					theme={InputTheme.Dashed}
					{...register("title", {
						required: "Введите название товара!",
						maxLength: {
							value: 127,
							message: "Не больше 127 символов",
						},
					})}
					className={classNames({
						[cls.title_input]: true,
						[cls.err_input]: !!errors.title,
					})}
					placeholder="Название товара"
				/>
				{errors.title && <ErrorText>{errors.title.message}</ErrorText>}
			</div>
			<Divider />
			<div className={cls.media_form_item}>
				<MediaPreview files={files} setFiles={setFiles}/>
				<InputFile
					id="files"
					type="file"
					label="Добавить файл"
					disabled={files.length >= 5}
					accept="image/*, video/*"
					{...register("files", {
						required: "Добавьте фото товара!",
					})}
					className={classNames({
						[cls.err_input]: !!errors.files,
					})}
				/>
				{errors.files && <ErrorText>{errors.files.message}</ErrorText>}
			</div>
		</form>
	);
};
