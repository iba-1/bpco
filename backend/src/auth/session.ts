import { SignJWT, jwtVerify } from "jose";

export interface CreateSessionParams {
  secret: string;
  subject: string;
  provider: string;
  ttlSeconds: number;
}

export interface SessionClaims {
  sub: string;
  provider: string;
  iat: number;
  exp: number;
}

export function createSession(params: CreateSessionParams): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({ provider: params.provider })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(params.subject)
    .setIssuedAt(now)
    .setExpirationTime(now + params.ttlSeconds)
    .sign(new TextEncoder().encode(params.secret));
}

export async function verifySession(params: {
  secret: string;
  token: string;
}): Promise<SessionClaims> {
  const { payload } = await jwtVerify(
    params.token,
    new TextEncoder().encode(params.secret),
    { algorithms: ["HS256"] },
  );
  if (typeof payload.sub !== "string" || typeof payload.provider !== "string") {
    throw new Error("Session token missing required claims");
  }
  return {
    sub: payload.sub,
    provider: payload.provider,
    iat: payload.iat as number,
    exp: payload.exp as number,
  };
}