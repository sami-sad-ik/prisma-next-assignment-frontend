import { env } from "@/env";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

const setAvailability = async (startTime: Date, endTime: Date) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/tutor/availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to set availability");
    }

    return response.json;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error setting availability:", error.message);
    throw error;
  }
};

const deleteAbility = async (id: string) => {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_BACKEND_URL}/api/tutor/availability/${id}`,
      {
        method: "DELETE",
        cache: "no-store",
        credentials: "include",
      },
    );

    const result = await res.json();

    return result;
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, message: "Network error occurred" };
  }
};

export { setAvailability, deleteAbility };
