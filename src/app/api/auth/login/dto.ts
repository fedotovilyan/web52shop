export interface LoginRequestDTO {
  email: string;
  password: string;
}

export type LoginResponseDTO =
	| {
			ok: true;
			accessToken: string;
    }
	| { ok: false; message: string };
