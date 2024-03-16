"use client";

import { Button, Modal } from "@/shared/ui";
import { FC, useState } from "react";
import cls from "./CatalogBtn.module.scss";
import classNames from "classnames";
import CatalogSvg from "@/shared/assets/icons/lines-white.svg";

interface CatalogBtnProps {
	className?: string;
}

export const CatalogBtn: FC<CatalogBtnProps> = ({ className }) => {
	const [isCatalogOpened, setIsCatalogOpened] = useState(false);
	return (
		<div className={classNames(cls.catalog_btn_container, className)}>
			<Button
				className={cls.btn}
				onClick={() => setIsCatalogOpened(!isCatalogOpened)}
			>
				<CatalogSvg
					className={cls.icon}
					alt=""
					fill="#fff"
					height={20}
					width={20}
				/>
				<div>
					Каталог
				</div>
			</Button>
			<Modal isOpen={isCatalogOpened} onClose={() => setIsCatalogOpened(false)}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quasi ad est distinctio maxime et explicabo inventore? Dicta, dolore tempore consectetur eum laborum ab repudiandae vero ullam quia nam debitis! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum enim soluta quis asperiores distinctio nobis rem accusantium possimus ea! Ipsa, nesciunt quidem. Perspiciatis, eaque nulla! Officiis optio doloribus dolorem obcaecati.
			</Modal>
		</div>
	);
};
