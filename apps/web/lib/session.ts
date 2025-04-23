'use server'
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  user: {
    id: number;
    name: string;
  };
   accessToken: string;
   refreshToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
console.log('secretKey', secretKey)
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: Session) {
  const expiredAt = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7);

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiredAt)
    .sign(encodedKey);

  (await cookies()).set("session", session, {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "lax",
    expires: expiredAt,
  });
}

export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) {
    return null;
  }
  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (error) {
    console.error("Filed to verify session", error);
    redirect("/auth/signin");
  }
}

export async function deleteSession() {
  (await cookies()).delete("session");
}
