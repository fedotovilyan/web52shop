"use client";

import { userSlice } from "@/entities/User";
import { configureStore } from "@reduxjs/toolkit";
import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore,
} from "react-redux";

export const makeStore = () => {
	return configureStore({
		reducer: {
			user: userSlice?.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),
	});
};


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
