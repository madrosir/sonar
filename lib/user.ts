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
export const fetchUsers = async () => {
  const {userId} =auth()
  if(!userId) {return []}
  try{
   const  users= await db.user.findMany ({
   
    where: {
      NOT:{
        userid: userId,
      }
          
     
    },
    
})
  return users;
  } catch (error: any) {
    return [];
  }
};

export async function fetchProfile(username: string) {
  noStore();

  try {
    const data = await db.user.findUnique({
      where: {
        username:username,
        
      },
      
      include: {
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

export async function fetchUserProfile() {
  const  user = await currentUser()
  if (!user) {
    return null;
  }
  const username = user.username!
  noStore();

  try {
    const data = await db.user.findUnique({
      where: {
        username:username,
        
      },
      
      include: {
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
export const fetchUserReceiver = async (userId:string) => {

   const  user= await db.user.findUnique ({
    where: {
          
      userid: userId,
    },
  })
  return user
};

export const fetchUser = async () => {
  const {userId} =auth()
  if(!userId) return null
  try{
   const  users= await db.user.findUnique ({
   
    where: {
      
        userid: userId,
      
          
     
    },
    
})
  return users;
  } catch (error: any) {
    return null;
  }
};