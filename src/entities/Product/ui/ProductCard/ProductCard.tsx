import { FC } from "react";
import cls from './ProductCard.module.scss';

interface ProductCardProps {
	className?: string;
}

export const ProductCard: FC<ProductCardProps> = (props) => {
	return (
		<div className={cls.product_card}>
			
		</div>
	);
};