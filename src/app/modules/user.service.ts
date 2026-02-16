import { env } from "@/env";
import { cookies } from "next/headers";

const backendUrl = env.NEXT_PUBLIC_BACKEND_URL;

const getSession = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${backendUrl}/api/auth/get-session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-cache",
    });

    const session = await res.json();
    return session;
  } catch (err) {
    console.log(err);
  }
};

export const userService = { getSession };
