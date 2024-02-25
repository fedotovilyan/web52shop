"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/User";
import { RegisterUser } from "@/shared/api/User";
import { Tokens } from "@/shared/types/Tokens";
import { getCookie } from "cookies-next";

export const startRegistration = createAsyncThunk<
	Pick<IUser, "phone"> & { accessToken: string },
	Pick<IUser, "phone"> & { password: string },
	{ rejectValue: string }
>("user/registration", async (payload, thunkApi) => {
	try {
		await RegisterUser(payload);

		const accessToken = getCookie(Tokens.Access) || "";

		return { phone: payload.phone, accessToken };
	} catch (e: any) {
		return thunkApi.rejectWithValue(e.message);
	}
});
