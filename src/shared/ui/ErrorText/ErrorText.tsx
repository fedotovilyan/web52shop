import { FC } from "react";
import cls from './ErrorText.module.scss';
import React from "react";

interface ErrorTextProps extends React.PropsWithChildren {}

export const ErrorText: FC<ErrorTextProps> = ({ children }) => {
	return (
		<span className={cls.error_text}>
			{children}
		</span>
	);
};