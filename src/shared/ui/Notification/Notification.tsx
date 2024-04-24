"use client";

import { FC, useEffect, useState, PropsWithChildren, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Alert } from "../Alert/Alert";
import { AlertType } from "@/shared/types/AlertType";
import classNames from "classnames";
import cls from "./Notification.module.scss";
import CrossSvg from "@/shared/assets/icons/cross.svg";
import { Button, ButtonTheme } from "../Button/Button";

interface NotificationProps extends PropsWithChildren {
  className?: string;
  position?: "top-right" | "top-left" | "top";
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  closable?: boolean;
  isOpen: boolean;
  onClose?: () => void;
}

export const Notification: FC<NotificationProps> = (props) => {
  const {
    position = "top",
    type = "info",
    className,
    duration,
    closable,
    children,
    isOpen,
    onClose,
  } = props;

  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [isClosing, setIsClosing] = useState(false);

  const onNotificationClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose?.();
    }, 500);
  }, [onClose]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (duration) {
      timerRef.current = setTimeout(() => {
        onNotificationClose();
      }, duration);
    }
    return () => clearTimeout(timerRef.current);
  }, [duration, onNotificationClose]);

  return mounted
    ? createPortal(
        <div
          className={classNames(
            cls.Notification,
            {
              [cls[position]]: true,
              [cls.opened]: isOpen,
              [cls.is_closing]: isClosing,
            },
            className
          )}
        >
          {type === "error" && <Alert type={AlertType.Error}>{children}</Alert>}
          {type === "info" && <Alert type={AlertType.Info}>{children}</Alert>}
          {type === "warning" && (
            <Alert type={AlertType.Warning}>{children}</Alert>
          )}
          {type === "success" && (
            <Alert type={AlertType.Success}>{children}</Alert>
          )}
          {closable && (
            <Button
              theme={ButtonTheme.Transparent}
              className={cls.close_btn}
              onClick={onNotificationClose}
            >
              <CrossSvg
                alt=""
                width={20}
                height={20}
                className={cls.cross_icon}
              />
            </Button>
          )}
        </div>,
        document.querySelector(".app") || document.body
      )
    : null;
};
