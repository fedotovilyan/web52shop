export type LoginResponseDTO =
	| {
			ok: true;
			accessToken: string;
    }
	| { ok: false; message: string };
