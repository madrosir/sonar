import { unstable_noStore as noStore } from "next/cache";
import { db } from "./db";

export async function fetchPosts() {
  // equivalent to doing fetch, cache: no-store
  noStore();

  try {
    const data = await db.post.findMany({
      include: {
        comments: {
          include: {
            user: true,
            likes: true
          },
         
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            User: true,
          },
        },
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts");
  }
}
export async function fetchPostById(id: string) {
  noStore();

  try {
    const data = await db.post.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            User: true,
          },
        },
        savedBy: true,
        user: true,
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post");
  }
}