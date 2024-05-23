"use server";
import { LikeSchema } from "@/lib/Schema";
import { db } from "@/lib/db";
import { action } from '@/lib/safe-action';
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

// the below code fragment can be found in:

export const  likePost =action(LikeSchema, async ({ postId}) => {
  const { userId } =  auth();
  if (!userId) 
    {
      throw new Error("Unauthorized");
    }

    
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });
  
    if (!post) {
      throw new Error("Post not found");
    }
  
    const like = await db.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
  
    if (like) {
      try {
        await db.like.delete({
          where: {
            postId_userId: {
              postId,
              userId,
            },
          },
        });
        revalidatePath("/");
        return { message: "Unliked Post." };
      } catch (error) {
        return { message: "Database Error: Failed to Unlike Post." };
      }
    }
  
    try {
      await db.like.create({
        data: {
          postId,
          userId,
          
        },
      });
      revalidatePath("/");
      return { message: "Liked Post." };
    } catch (error) {
      return { message: "Database Error: Failed to Like Post." };
    }
  })