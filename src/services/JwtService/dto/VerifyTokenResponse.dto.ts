import jwt from "jsonwebtoken";
import { JwtGenerateTokensPayload } from "./JwtGenerateTokensPayload.dto";

export type VerifyTokenResponse = jwt.JwtPayload & JwtGenerateTokensPayload;
