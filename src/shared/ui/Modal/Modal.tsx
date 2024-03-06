/* eslint-disable no-mixed-spaces-and-tabs */
"use client";

import {
	FC,
	MouseEventHandler,
	PropsWithChildren,
	useEffect,
	useState,
} from "react";
import cls from "./Modal.module.scss";
import classNames from "classnames";
import { createPortal } from "react-dom";
import CrossSvg from "@/shared/assets/icons/cross.svg";
import { Button, ButtonTheme } from "..";

export interface ModalProps extends PropsWithChildren {
	isOpen: boolean;
	onClose?: () => void;
	className?: string;
	closable?: boolean;
}

export const Modal: FC<ModalProps> = (props) => {
	const { isOpen, onClose, className, children, closable = true } = props;
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const onChildrenClick: MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
	};

	const onOverlayClick: MouseEventHandler<HTMLDivElement> = () => {
		if (closable) {
			onClose?.();
		}
	};

	return mounted
		? createPortal(
				<div
					className={classNames(cls.modal_container, {
						[cls.opened]: isOpen,
					})}
					onClick={onOverlayClick}
				>
					<div
						onClick={onChildrenClick}
						className={classNames(cls.children, className)}
					>
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
						{children}
					</div>
				</div>,
				document.querySelector(".app") || document.body
		  )
		: null;
};
