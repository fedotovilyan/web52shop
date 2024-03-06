import { RootState } from "@/app/store";

export const selectProfileData = (state: RootState) => state?.user?.profile?.profileData;
