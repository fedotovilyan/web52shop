"use client";
import { Button } from "@/shared/ui";
import cls from "./ProductGenerator.module.scss";
import { ProductForm } from "@/entities/Product";

export const ProductGenerator = () => {
	return (
		<div>
			<ProductForm onFormSubmit={console.log} />
		</div>
	);
};
