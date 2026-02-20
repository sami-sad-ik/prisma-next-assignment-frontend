/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

const bookSession = async (availabilityId: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        availabilityId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Booking failed");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

const getTutorSessions = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/bookings/sessions`, {
      method: "GET",
      cache: "no-store",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to retrieve the sessions!");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

const completeSession = async (bookingId: string) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/bookings/complete/${bookingId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to complete session");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export { bookSession, getTutorSessions, completeSession };
