import { FC, HTMLAttributes } from "react";
import cls from "./Divider.module.scss";
import classNames from "classnames";

interface Divider extends HTMLAttributes<HTMLDivElement> {}

export const Divider: FC<Divider> = ({ className, ...rest}) => {
	return <div className={classNames(cls.Divider, className)} {...rest}></div>;
};
