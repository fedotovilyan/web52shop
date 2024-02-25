"use client";
import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import cls from "./Alert.module.scss";
import WarningSvg from "@/shared/assets/icons/diamond-exclamation.svg";
import SuccessSvg from "@/shared/assets/icons/check.svg";
import InfoSvg from "@/shared/assets/icons/exclamation.svg";
import ErrorSvg from "@/shared/assets/icons/x.svg";
import { AlertType } from "@/shared/types/AlertType";

interface AlertProps extends PropsWithChildren {
	type?: AlertType;
	className?: string;
	closable?: boolean;
}

export const Alert: FC<AlertProps> = (props) => {
	const { children, className, type = AlertType.Info, closable } = props;

	return (
		<div className={classNames(cls.Alert, cls[type], className)}>
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
		</div>
	);
};
