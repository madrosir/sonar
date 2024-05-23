"use server";
import { unstable_noStore as noStore } from "next/cache";

import {  auth, currentUser } from "@clerk/nextjs";
import { db } from "./db";

export const initializer = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const userprofile = await db.user.findUnique({
    where: {
      userid: user.id,
    },
  });
  if (userprofile) {
    return null;
  }
  const newProfile = await db.user.create({
    data: {
      userid: user.id,
      name: `${user.firstName} ${user.lastName || ""}`,
      email: user.emailAddresses[0].emailAddress,
    username:`${user.username}`,
    imageUrl: `${user.imageUrl}`,
    },
  });
   

  return newProfile;
};
export const fetchUser = async () => {
  const {userId} =auth()
  if(!userId) {return null}
   const  user= await db.user.findUnique ({
    where: {
          
      userid: userId,
    },
  })
  return user
};

export async function fetchProfile(username: string) {
  noStore();

  try {
    const data = await db.user.findUnique({
      where: {
        username,
      }, include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
        saved: {
          orderBy: {
            createdAt: "desc",
          },
        },
        followedBy: {
          include: {
            follower: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
        following: {
          include: {
            following: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch profile");
  }
}

