import { env } from "@/env";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

const getTutorReviews = async () => {
  const res = await fetch(`${BACKEND_URL}/api/reviews`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // IMPORTANT: This allows cookies to be sent with the request
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch reviews");
  }

  return res.json();
};

export { getTutorReviews };
