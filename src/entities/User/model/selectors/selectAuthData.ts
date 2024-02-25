import { RootState } from "@/app/store";

export const selectAuthData = (state: RootState) => state.user.auth;