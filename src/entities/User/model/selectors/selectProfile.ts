import { RootState } from "@/app/store";

export const selectProfile = (state: RootState) => state?.user?.profile;
