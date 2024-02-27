"use client";
import { Logout } from "@/shared/api/Auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk<
	void,
	void,
	{ rejectValue: string }
>("user/logout", async (_, thunkApi) => {
	try {
		await Logout();
	} catch (e: any) {
		return thunkApi.rejectWithValue(e.message);
	}
});
