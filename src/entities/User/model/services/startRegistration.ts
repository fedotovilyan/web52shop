"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterUser } from "@/shared/api/Auth";
import { IUser } from "@/shared/models/User";

export const startRegistration = createAsyncThunk<
	Pick<IUser, "email"> & { accessToken: string },
	Pick<IUser, "email"> & { password: string },
	{ rejectValue: string }
>("user/registration", async (payload, thunkApi) => {
	try {
		const accessToken = await RegisterUser(payload);

		return { email: payload.email, accessToken };
	} catch (e: any) {
		return thunkApi.rejectWithValue(e.message);
	}
});
