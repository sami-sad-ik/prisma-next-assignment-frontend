import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

const getAvailability = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${BACKEND_URL}/api/tutor/availability`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};
export { getAvailability };
