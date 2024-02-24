import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export interface GenerateCookiesResponseDTO {
	accessCookie: ResponseCookie,
	refreshCookie: ResponseCookie,
}