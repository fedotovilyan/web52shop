"use client";

import { getProfile, selectAuthData, selectProfile } from "@/entities/User";
import { useAppDispatch, useAppSelector } from "./store";
import { ReactNode, useEffect } from "react";

export default function Template({ children }: { children: ReactNode }) {
	const dispatch = useAppDispatch();
	const authData = useAppSelector(selectAuthData);
	console.log(authData);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	return <>{children}</>;
}
