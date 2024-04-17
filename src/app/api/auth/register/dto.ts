export type RegisterResponseDTO =
	| {
			ok: false;
			message: string;
    }
	| { ok: true; accessToken: string };
