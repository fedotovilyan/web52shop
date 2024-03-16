/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
"use client";

import { store } from "@/app/store";
import { isTokenExpired } from "../utils/isTokenExpired";
import { refreshTokens, setAccessToken } from "@/entities/User";

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
		dispatch(setAccessToken(token));
	}

	return fetch(input, {
		...init,
		headers: {
			...init?.headers,
			Authorization: `Bearer ${token}`,
		},
	});
};
