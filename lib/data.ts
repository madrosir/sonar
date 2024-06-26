import { Message } from '@prisma/client';

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { db } from "./db";

import { fetchUser } from './user';
import { currentUser } from "@clerk/nextjs";

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

export async function fetchFollowing() {
  const user = await fetchUser();
  if (!user) {
    revalidatePath("/sign-in");
    throw Error("User not found");
  }

  try {
    const followingUsers = await db.follows.findMany({
      where: { followerId: user.id },
      select: {
        followingId: true,
        following: {
          select: {
            username: true,
            imageUrl: true,
            id: true,
            userid: true,
            messages: {
              select: {
                id: true,
                content: true,
                createdAt: true,
                seenMessages: true
              },
              orderBy: {
                createdAt: 'desc'
              },
              take: 1
            }
          }
        },
        followerId: true,
      }
    });

    return followingUsers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch following users");
  }
}

export async function fetchStories() {
 
  const user = await fetchUser()
  if(!user){
    throw Error("User not authenticated")
  }
  const id = user.id
  try {
    const followingUsers = await db.follows.findMany({
      where: {
        followerId: id,
      },
      include: {
        following: {
          include: {
            stories: true,
          },
        },
      },
    });

    return followingUsers.map((user) => user.following);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch stories");
  }
}

