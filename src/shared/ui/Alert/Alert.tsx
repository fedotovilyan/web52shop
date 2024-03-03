"use client";
import classNames from "classnames";
import { FC, PropsWithChildren, useState } from "react";
import cls from "./Alert.module.scss";
import WarningSvg from "@/shared/assets/icons/diamond-exclamation.svg";
import SuccessSvg from "@/shared/assets/icons/check.svg";
import InfoSvg from "@/shared/assets/icons/exclamation.svg";
import ErrorSvg from "@/shared/assets/icons/x.svg";
import CrossSvg from "@/shared/assets/icons/cross.svg";
import { AlertType } from "@/shared/types/AlertType";
import { Button, ButtonTheme } from "..";

interface AlertProps extends PropsWithChildren {
	type?: AlertType;
	className?: string;
	closable?: boolean;
}

export const Alert: FC<AlertProps> = (props) => {
	const { children, className, type = AlertType.Info, closable } = props;
	const [isHidden, setIsHidden] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const onClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsHidden(true);
		}, 500);
	};

	return (
		<div
			className={classNames(
				cls.Alert,
				cls[type],
				{ [cls.hidden]: isHidden, [cls.is_closing]: isClosing },
				className
			)}
		>
			{type === AlertType.Info && (
				<InfoSvg
					fill="#1677ff"
					alt=""
					width={24}
					height={24}
					className={cls.icon}
				/>
			)}
			{type === AlertType.Error && (
				<ErrorSvg
					fill="#ff4d4f"
					alt=""
					width={24}
					height={24}
					className={cls.icon}
				/>
			)}
			{type === AlertType.Success && (
				<SuccessSvg
					fill="#52c41a"
					alt=""
					width={24}
					height={24}
					className={cls.icon}
				/>
			)}
			{type === AlertType.Warning && (
				<WarningSvg
					fill="#faad14"
					alt=""
					width={24}
					height={24}
					className={cls.icon}
				/>
			)}
			{children}
			{closable && (
				<Button
					theme={ButtonTheme.Transparent}
					className={cls.close_btn}
					onClick={onClose}
				>
					<CrossSvg
						fill="#faad14"
						alt=""
						width={20}
						height={20}
						className={cls.cross_icon}
					/>
				</Button>
			)}
		</div>
	);
};
