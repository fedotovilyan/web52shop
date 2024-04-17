"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignIn } from "@/shared/api/Auth";
import { IUser } from "@/shared/models/User";

export const signIn = createAsyncThunk<
	Pick<IUser, "email"> & { accessToken: string },
	Pick<IUser, "email"> & { password: string },
	{ rejectValue: string }
>("user/signIn", async (payload, thunkApi) => {
	try {
		const accessToken = await SignIn(payload);

		return { email: payload.email, accessToken };
	} catch (e: any) {
		return thunkApi.rejectWithValue(e.message);
	}
});
