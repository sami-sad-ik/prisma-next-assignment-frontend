import { env } from "@/env";

interface tutorData {
  bio: string;
  hourlyRate: string;
  categoryIds: string[];
}

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

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

const updateTutorProfile = async (tutorData: tutorData) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tutors`;
  console.log("LOG: Attempting fetch to:", url);

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(tutorData),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Server error");
    }

    return json;
  } catch (err) {
    console.error("LOG: Fetch internal error:", err);
    throw err;
  }
};

export { becomeTutor, updateTutorProfile };
