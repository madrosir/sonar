"use server";
import { FollowUser} from "@/lib/Schema";
import { db } from "@/lib/db";
import { action } from '@/lib/safe-action';
import { fetchUser } from "@/lib/user";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

// the below code fragment can be found in:

export const  followUser = action(FollowUser, async ({ userId ,role}) => {
  const user = await  fetchUser();
  if (!user) 
    {
      throw new Error("Unauthorized");
    }

    
   
    
  
    const follows = await db.follows.findUnique({
      where: {
        followerId_followingId: {
           
            followerId: user.id,
            
            followingId: userId,
        },
      },
    });
  
    if (follows) {
      try {
        await db.follows.delete({
          where: {
            followerId_followingId: {
              
                followerId:  user.id,
              
                followingId: userId,
            },
          },
        });
        revalidatePath("/");
        return { message: "Unfollowed User." };
      } catch (error) {
        return { message: "Database Error: Failed to Unfollow User." };
      }
    }
  
    if( user.userid=== userId){
      return { message: "You can not follow yourself." };
     
    }
    try {
      const createFollow =await db.follows.create({
        data: {
            followerId: user.id,
            role:role,
            followingId: userId,
          
        },
      });
      revalidatePath("/");
      return { message: "Followed User." };
    } catch (error) {
      
      return console.log( user.id)
    }
  })