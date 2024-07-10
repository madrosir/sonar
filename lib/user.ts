"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import {  auth, currentUser } from "@clerk/nextjs";
import { db } from "./db";
import UserProfile from "./definitions";

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

export async function fetchProfile(username: string) : Promise<UserProfile | null>{
  noStore();

  try {
    const data = await db.user.findUnique({
      where: {
        username: username,
      },
      include: {
        posts: {
          include: {
            comments: {
              include: {
                user: true,
                replies: true,
                likes: true,
              },
            },
            likes: true,
            savedBy: true,
            user: true,
          },
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
    return data as unknown as UserProfile;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch profile");
  }
}

// Adjust the path according to your setup
export async function fetchUserProfile(): Promise<UserProfile | null> {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const username = user.username!;
  noStore();

  try {
    const data = await db.user.findUnique({
      where: {
        username: username,
      },
      include: {
        posts: {
          include: {
            comments: {
              include: {
                user: true,
                replies: true,
                likes: true,
              },
            },
            likes: true,
            savedBy: true,
            user: true,
          },
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
    return data as unknown  as UserProfile;
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


export async function fetchFollowers() {
  const {userId} =  auth()
  if(!userId){
    revalidatePath("/sign-in");
    return null;
  }
  const followingUsers = await db.follows.findMany({
    where: {
     role:"FRIEND"
    },
    include: {
      following: {
        select: {
          stories: true,
         
        }
      }
    }
  });
  return followingUsers
 
}