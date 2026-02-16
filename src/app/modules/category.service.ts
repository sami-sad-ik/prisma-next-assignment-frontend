import { env } from "@/env";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

const getCategories = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/category`, {
      cache: "no-store",
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const categoryService = { getCategories };
