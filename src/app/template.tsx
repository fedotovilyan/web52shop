"use client";

import { getProfile, selectProfile } from "@/entities/User";
import { useAppDispatch, useAppSelector } from "./store";
import { ReactNode, useEffect } from "react";
import { Loader } from "@/shared/ui";

export default function Template({ children }: { children: ReactNode }) {
	const dispatch = useAppDispatch();
	const { isProfileFetching, profileData } = useAppSelector(selectProfile);
	console.log(profileData);
	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	if (isProfileFetching) {
		return <Loader fullscreen spinning />;
	}

	return <>{children}</>;
}
