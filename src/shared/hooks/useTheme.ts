import { useState } from "react";

export const THEME_LOCAL_STORAGE_KEY = 'theme';

export enum Themes {
	LIGHT = 'light',
	DARK = 'dark',
}

const defaultTheme =
	(localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as Themes) ?? Themes.LIGHT;

export const useTheme = () => {
	const [theme, setTheme] = useState<Themes>(defaultTheme);

	const toggleTheme = () => {
		const newTheme = theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
		setTheme(newTheme);
		localStorage.setItem(THEME_LOCAL_STORAGE_KEY, newTheme);
	};

	return { theme, setTheme, toggleTheme };
};