"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../../../shared/models/User";
import { UpdateCurrentUser } from "@/shared/api/User";
import { RootState } from "@/app/store";
import { ProfileFormInputs } from "@/entities/User/ui/ProfileForm";

export const updateProfile = createAsyncThunk<
	IUser,
	ProfileFormInputs,
	{ rejectValue: string }
>("user/profile/update", async (profile, thunkApi) => {
	try {
		const state = thunkApi.getState() as RootState;
		const accessToken: string | null =
			state.user.auth.accessToken || "";

		const res = await UpdateCurrentUser(profile, accessToken);
		return res;
	} catch (e: any) {
		return thunkApi.rejectWithValue(e.message);
	}
});
