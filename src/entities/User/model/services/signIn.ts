"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/User";
import { Tokens } from "@/shared/types/Tokens";
import { getCookie } from "cookies-next";
import { SignIn } from "@/shared/api/Auth";

export const signIn = createAsyncThunk<
	Pick<IUser, "email"> & { accessToken: string },
	Pick<IUser, "email"> & { password: string },
	{ rejectValue: string }
>("user/signIn", async (payload, thunkApi) => {
	try {
		await SignIn(payload);

		const accessToken = getCookie(Tokens.Access) || "";

		return { email: payload.email, accessToken };
	} catch (e: any) {
		return thunkApi.rejectWithValue(e.message);
	}
});
