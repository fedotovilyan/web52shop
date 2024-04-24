export type RegisterRequestDTO = {
  email: string;
  password: string;
};

export type RegisterResponseDTO =
  | {
      ok: false;
      message: string;
    }
  | { ok: true; accessToken: string };
