"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetCurrentUser } from "@/shared/api/User";
import { RootState } from "@/app/store";
import { Tokens } from "@/shared/types/Tokens";
import { getCookie } from "cookies-next";
import { IUser } from "@/shared/models/User";

export const getProfile = createAsyncThunk<
	IUser,
	void,
	{ rejectValue: string }
>("user/profile", async (_, thunkApi) => {
	try {
		const state = thunkApi.getState() as RootState;
		const accessToken: string | null =
			state.user.auth.accessToken || getCookie(Tokens.Access) || "";

		return await GetCurrentUser(accessToken);
	} catch (e: any) {
		return thunkApi.rejectWithValue(e.message);
	}
});
