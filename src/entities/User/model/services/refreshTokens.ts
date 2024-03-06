"use client";
import { AppDispatch, RootState } from "@/app/store";
import { Refresh, RefreshErrors } from "@/shared/api/Auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetState } from "../userSlice";
import { Tokens } from "@/shared/types/Tokens";
import { getCookie } from "cookies-next";

export const refreshTokens = createAsyncThunk<
	string,
	void,
	{ rejectValue: string | null }
>("user/refreshTokens", async (_, thunkApi) => {
	const dispatch = thunkApi.dispatch as AppDispatch;
	const state = thunkApi.getState() as RootState;
	let refreshPromise = state.user.auth.refreshPromise;

	try {
		if (!refreshPromise) {
			refreshPromise = Refresh();
		}
		await refreshPromise;
		return getCookie(Tokens.Access) || "";
	} catch (e: any) {
		if (e.message === RefreshErrors.TokensIsExpired) {
			dispatch(resetState());
			return thunkApi.rejectWithValue(null);
		}

		return thunkApi.rejectWithValue(e.message);
	}
});
