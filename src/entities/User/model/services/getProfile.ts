"use client";
import { Logout } from "@/shared/api/Auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/User";
import { GetCurrentUser } from "@/shared/api/User";
import { AppDispatch, RootState } from "@/app/store";
import { Tokens } from "@/shared/types/Tokens";
import { getCookie } from "cookies-next";
import { setAccessToken } from "../userSlice";

export const getProfile = createAsyncThunk<
	IUser,
	void,
	{ rejectValue: string }
>("user/profile", async (_, thunkApi) => {
	const dispatch = thunkApi.dispatch as AppDispatch;
	try {
		const state = thunkApi.getState() as RootState;
		let accessToken: string | null =
			state.user.auth.accessToken || getCookie(Tokens.Access) || "";

		const response = await GetCurrentUser(accessToken);

		accessToken = getCookie(Tokens.Access) || null;
		dispatch(setAccessToken(accessToken));

		return response;
	} catch (e: any) {
		return thunkApi.rejectWithValue(e.message);
	}
});
