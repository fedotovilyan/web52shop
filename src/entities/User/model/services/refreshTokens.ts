"use client";
import { AppDispatch } from "@/app/store";
import { Refresh, RefreshErrors } from "@/shared/api/Auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetState } from "../userSlice";

export const refreshTokens = createAsyncThunk<
	string,
	void,
	{ rejectValue: string | null }
>("user/refreshTokens", async (_, thunkApi) => {
	const dispatch = thunkApi.dispatch as AppDispatch;

	try {
		const accessToken = await Refresh();
		return accessToken || "";
	} catch (e: any) {
		console.log(e);
		if (e.message === RefreshErrors.TokensIsExpired) {
			dispatch(resetState());
			return thunkApi.rejectWithValue(null);
		}

		return thunkApi.rejectWithValue(e.message);
	}
});
