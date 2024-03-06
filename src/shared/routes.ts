export const WEB_ROUTES = {
	main: "/",
	about: "/about",
	registration: "/auth/registration",
	login: "/auth/login",

	adminPanel: {
		main: '/backoffice'
	},
};

export const API_ROUTES = {
	register: "/api/auth/register",
	logout: "/api/auth/logout",
	login: "/api/auth/login",
	refresh: "/api/auth/refresh",

	getCurrentUser: "/api/user/current",
	updateCurrentUser: "/api/user/current/update"
};
