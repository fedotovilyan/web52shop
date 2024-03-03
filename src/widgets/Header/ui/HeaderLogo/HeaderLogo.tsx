"use client";
import Image from "next/image";
import Logo from "@/shared/assets/logo.png";
import { FC, ImgHTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import { WEB_ROUTES } from "@/shared/routes";

interface HeaderLogoProps {
	className?: string;
}

export const HeaderLogo: FC<HeaderLogoProps> = (props) => {
	const router = useRouter();
	const onLogoClick = () => {
		router.push(WEB_ROUTES.main);
	};

	return (
		<Image
			onClick={onLogoClick}
			width={200}
			height={100}
			src={Logo}
			alt=""
			{...props}
		/>
	);
};
