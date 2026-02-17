import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

const getFeaturedTutors = async () => {
  const featuredTutors = await fetch(`${BACKEND_URL}/api/tutors/featured`, {
    cache: "no-store",
  });
  if (!featuredTutors.ok) throw new Error("Failed to fetch featured tutors!");

  return featuredTutors.json();
};

const getAllTutors = async () => {
  const res = await fetch(`${BACKEND_URL}/api/tutors`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch tutors!");
  return res.json();
};

const getSpecificTutor = async (id: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/tutors/${id}`, {
      cache: "no-store",
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getMyTutorProfile = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${BACKEND_URL}/api/tutors/profile`, {
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

export { getFeaturedTutors, getAllTutors, getSpecificTutor, getMyTutorProfile };
