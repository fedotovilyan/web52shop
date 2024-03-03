"use client";

import { getProfile, selectProfile } from "@/entities/User";
import { useAppDispatch, useAppSelector } from "./store";
import { ReactNode, useEffect } from "react";
import { Loader } from "@/shared/ui";

export default function Template({ children }: { children: ReactNode }) {
	const {
		profileData: { email },
		isProfileFetching,
	} = useAppSelector(selectProfile);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!email) {
			dispatch(getProfile());
		}
	}, [dispatch, email]);

	if (isProfileFetching) {
		return <Loader spinning fullscreen />;
	}

	return <>{children}</>;
}
