import { env } from "@/env";

const BACKEND_URL = env.BACKEND_URL;

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

export const tutorService = {
  getFeaturedTutors,
  getAllTutors,
  getSpecificTutor,
};
