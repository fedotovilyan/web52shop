import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types/User";
import { startRegistration } from "./services/startRegistration";
import { logout } from "./services/logout";

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
					phone: payload.phone,
				};
				state.auth.accessToken = payload.accessToken;
				state.auth.loading = false;
				state.profile.loading = false;
			})
			.addCase(startRegistration.rejected, (state, { payload }) => {
				state.auth.error = payload;
				state.auth.loading = false;
				state.profile.loading = false;
			})

		
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
			})
	},
});
