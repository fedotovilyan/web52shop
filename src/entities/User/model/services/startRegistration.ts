"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/User";
import { Tokens } from "@/shared/types/Tokens";
import { getCookie } from "cookies-next";
import { RegisterUser } from "@/shared/api/Auth";

export const startRegistration = createAsyncThunk<
	Pick<IUser, "email"> & { accessToken: string },
	Pick<IUser, "email"> & { password: string },
	{ rejectValue: string }
>("user/registration", async (payload, thunkApi) => {
	try {
		await RegisterUser(payload);

		const accessToken = getCookie(Tokens.Access) || "";

		return { email: payload.email, accessToken };
	} catch (e: any) {
		return thunkApi.rejectWithValue(e.message);
	}
});
