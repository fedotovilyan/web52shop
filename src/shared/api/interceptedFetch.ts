"use client";

import { store, useAppDispatch } from "@/app/store";
import { isTokenExpired } from "../utils/isTokenExpired";
import { refreshTokens } from "@/entities/User";

type TInterceptedFetch = (
	input: URL | RequestInfo,
	accessToken: string,
	init?: RequestInit | undefined
) => Promise<Response>;

export const interceptedFetch: TInterceptedFetch = async (
	input,
	accessToken,
	init
) => {
	const dispatch = store.dispatch;
	let token = accessToken;
	if (isTokenExpired(accessToken)) {
		token = await dispatch(refreshTokens()).unwrap();
	}

	return fetch(input, {
		...init,
		headers: {
			...init?.headers,
			Authorization: `Bearer ${token}`,
		},
	});
};
