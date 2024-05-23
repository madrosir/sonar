"use server";
import { FollowUser} from "@/lib/Schema";
import { db } from "@/lib/db";
import { action } from '@/lib/safe-action';
import { fetchUser } from "@/lib/user";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

// the below code fragment can be found in:

export const  followUser = action(FollowUser, async ({ id}) => {
  const {userId} =  auth();
  if (!userId) 
    {
      throw new Error("Unauthorized");
    }

    
    const User = await db.user.findUnique({
      where: {
        id,
      },
    });
  
    if (!User) {
      throw new Error("User not found");
    }
  
    const follows = await db.follows.findUnique({
      where: {
        followerId_followingId: {
           
            followerId: userId,
            
            followingId: id,
        },
      },
    });
  
    if (follows) {
      try {
        await db.follows.delete({
          where: {
            followerId_followingId: {
              
                followerId: userId,
              
                followingId: id,
            },
          },
        });
        revalidatePath("/");
        return { message: "Unfollowed User." };
      } catch (error) {
        return { message: "Database Error: Failed to Unfollow User." };
      }
    }
  
    try {
      await db.follows.create({
        data: {
            followerId:userId,
          
            followingId: id,
          
        },
      });
      revalidatePath("/");
      return { message: "Followed User." };
    } catch (error) {
      
      return console.log(userId)
    }
  })