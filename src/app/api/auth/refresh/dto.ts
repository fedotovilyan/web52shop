export type RefreshTokensResponseDTO =
	| {
			ok: true;
			accessToken: string;
  }
	| { ok: false; message: string };
