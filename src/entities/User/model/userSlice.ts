"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types/User";
import { startRegistration } from "./services/startRegistration";
import { logout } from "./services/logout";
import { signIn } from "./services/signIn";
import { refreshTokens } from "./services/refreshTokens";
import { getProfile } from "./services/getProfile";

export interface UserState {
	auth: {
		loading: boolean;
		error: string | null | undefined;
		accessToken: string | null;
	};
	profile: {
		loading: boolean;
		error: string | null | undefined;
		profileData: Partial<IUser>;
	};
}

const initialState: UserState = {
	auth: {
		loading: false,
		error: null,
		accessToken: null,
	},
	profile: {
		loading: false,
		error: null,
		profileData: {},
	},
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetState: () => initialState,
		setAccessToken: (state, { payload }: PayloadAction<string | null>) => {
			state.auth.accessToken = payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(startRegistration.pending, (state) => {
				state.auth.loading = true;
				state.auth.error = null;
				state.profile.loading = true;
			})
			.addCase(startRegistration.fulfilled, (state, { payload }) => {
				state.profile.profileData = {
					...state.profile.profileData,
					email: payload.email,
				};
				state.auth.accessToken = payload.accessToken;
				state.auth.loading = false;
				state.profile.loading = false;
			})
			.addCase(startRegistration.rejected, (state, { payload }) => {
				state.auth.error = payload;
				state.auth.loading = false;
				state.profile.loading = false;
			});

		builder
			.addCase(signIn.pending, (state) => {
				state.auth.loading = true;
				state.auth.error = null;
				state.profile.loading = true;
			})
			.addCase(signIn.fulfilled, (state, { payload }) => {
				state.profile.profileData = {
					...state.profile.profileData,
					email: payload.email,
				};
				state.auth.accessToken = payload.accessToken;
				state.auth.loading = false;
				state.profile.loading = false;
			})
			.addCase(signIn.rejected, (state, { payload }) => {
				state.auth.error = payload;
				state.auth.loading = false;
				state.profile.loading = false;
			});

		builder
			.addCase(logout.pending, (state) => {
				state.auth.loading = true;
				state.auth.error = null;
				state.profile.loading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state = initialState;
			})
			.addCase(logout.rejected, (state, { payload }) => {
				state.auth.error = payload;
				state.auth.loading = false;
				state.profile.loading = false;
			});

		builder
			.addCase(refreshTokens.pending, (state) => {
				state.auth.loading = true;
			})
			.addCase(refreshTokens.fulfilled, (state, { payload }) => {
				state.auth.accessToken = payload;
				state.auth.loading = false;
			})
			.addCase(refreshTokens.rejected, (state, { payload }) => {
				state.auth.error = payload;
				state.auth.loading = false;
			});

		builder
			.addCase(getProfile.pending, (state) => {
				state.profile.loading = true;
			})
			.addCase(getProfile.fulfilled, (state, { payload }) => {
				state.profile.profileData = payload;
				state.profile.loading = false;
			})
			.addCase(getProfile.rejected, (state, { payload }) => {
				state.profile.error = payload;
				state.profile.loading = false;
			});
	},
});

export const { resetState, setAccessToken } = userSlice.actions;
