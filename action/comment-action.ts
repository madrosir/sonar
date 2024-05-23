"use server"

import { CommentSchema,  LikeCommentSchema,  deleteComment } from "@/lib/Schema";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const  createComment =action(CommentSchema, async ({ postId , body}) => {
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
  
    try {
      await db.comment.create({
        data: {
          body,
          postId,
          userId,
        },
      });
      revalidatePath("/");
      return { message: "Created Comment." };
    } catch (error) {
      return { message: "Database Error: Failed to Create Comment." };
    }
  }
)
export const CommentDelete = action(deleteComment, async ({ id }) => {
  try {
   
    await db.comment.delete({ where: { id:id } });
    revalidatePath("/");
    return { success: "Post created successfully" };
    
  } catch (error) {
   
    console.error("Error creating post:", error);
    return { failure: "An error occurred while creating the post" };
  }
});

export const  createReplay =action(CommentSchema, async ({ postId , body,parentId}) => {
  const { userId } =  auth();
  if (!userId) 
    {
      throw new Error("Unauthorized");
    }
    try{
    await db.comment.create({
      data: {
        body: body,
        postId: postId,
        userId: userId,
        parentId,
      },
      
    })
    revalidatePath("/");
    return { message: "Created Comment." };
  } catch (error) {
    return { message: "Database Error: Failed to Create Comment." };
  }})

  export const  likeComment =action(LikeCommentSchema, async ({ commentId }) => {
    const { userId } =  auth();
    if (!userId) 
      {
        throw new Error("Unauthorized");
      }
  
      
      const comment = await db.comment.findUnique({
        where: {
          id: commentId,
        },
      });
    
      if (!comment) {
        throw new Error("Comment not found");
      }
    
      const like = await db.like.findUnique({
        where: {
          commentId_userId: {
            commentId,
            userId,
          },
        },
      });
    
      if (like) {
        try {
          await db.like.delete({
            where: {
              commentId_userId: {
                commentId,
                userId,
              },
            },
          });
          revalidatePath("/");
          return { message: "Unliked Comment." };
        } catch (error) {
          return { message: "Database Error: Failed to Unlike Comment." };
        }
      }
    
      try {
        await db.like.create({
          data: {
            commentId,
            userId,
            
          },
        });
        revalidatePath("/");
        return { message: "Liked Comment." };
      } catch (error) {
       
        return { message: "Database Error: Failed to Like Comment." };
      }
    })