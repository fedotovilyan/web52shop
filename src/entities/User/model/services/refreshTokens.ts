"use client";
import { AppDispatch } from "@/app/store";
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

	try {
		await Refresh();
		return getCookie(Tokens.Access) || "";
	} catch (e: any) {
		if (e.message === RefreshErrors.TokensIsExpired) {
			dispatch(resetState());
			return thunkApi.rejectWithValue(null);
		}

		return thunkApi.rejectWithValue(e.message);
	}
});
