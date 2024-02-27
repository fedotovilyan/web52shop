"use client";

import { getProfile, selectProfile } from "@/entities/User";
import { useAppDispatch, useAppSelector } from "./store";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
	const {
		profileData: { email },
	} = useAppSelector(selectProfile);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!email) {
			dispatch(getProfile());
		}
	}, [email]);

	return <>{children}</>;
}
