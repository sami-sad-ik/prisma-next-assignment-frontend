import { env } from "@/env";

interface tutorData {
  bio: string;
  hourlyRate: string;
  categoryIds: string[];
}

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

const becomeTutor = async (data: tutorData) => {
  const response = await fetch(`${BACKEND_URL}/api/user/tutor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!result.success) throw new Error(result.message);
};

export const tutorService = {
  getFeaturedTutors,
  getAllTutors,
  getSpecificTutor,
  becomeTutor,
};
