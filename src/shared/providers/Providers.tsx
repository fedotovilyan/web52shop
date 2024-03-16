"use client";
import { PropsWithChildren } from "react";
import StoreProvider from "./StoreProvider";

export const Providers = ({ children }: PropsWithChildren) => {
	return <StoreProvider>{children}</StoreProvider>;
};
