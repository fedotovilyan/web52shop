"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Logout } from "@/shared/api/User";

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
