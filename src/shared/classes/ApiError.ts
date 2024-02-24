export interface ApiErrorPayload {
	status: number;
	message: string;
}

export class ApiError extends Error {
	status?: number;

	constructor(payload: ApiErrorPayload) {
		super(payload.message);
		this.status = payload.status;
	}

	static BadRequestException(message: string) {
		return new ApiError({
			status: 400,
			message,
		});
	}

	static NotFoundException(message: string) {
		return new ApiError({
			status: 404,
			message,
		});
	}

	static ForbiddenException(message: string) {
		return new ApiError({
			status: 403,
			message,
		});
	}

	static UnauthorizedException(message: string) {
		return new ApiError({
			status: 401,
			message,
		});
	}

	static InternalServerException(message: string) {
		return new ApiError({
			status: 500,
			message,
		});
	}
}