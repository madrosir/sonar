"use server"
import { BookmarkSchema } from "@/lib/Schema";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function bookmarkPost(value: FormDataEntryValue | null) {
    const user = await currentUser();
    const userId = user!.id
  
    const validatedFields = BookmarkSchema.safeParse({ postId: value });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Bookmark Post.",
      };
    }
  
    const { postId } = validatedFields.data;
  
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });
  
    if (!post) {
      throw new Error("Post not found.");
    }
  
    const bookmark = await db.savedPost.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
  
    if (bookmark) {
      try {
        await db.savedPost.delete({
          where: {
            postId_userId: {
              postId,
              userId,
            },
          },
        });
        revalidatePath("/dashboard");
        return { message: "Unbookmarked Post." };
      } catch (error) {
        return {
          message: "Database Error: Failed to Unbookmark Post.",
        };
      }
    }
  
    try {
      await db.savedPost.create({
        data: {
          postId,
          userId,
        },
      });
      revalidatePath("/dashboard");
      return { message: "Bookmarked Post." };
    } catch (error) {
      return {
        message: "Database Error: Failed to Bookmark Post.",
      };
    }
  }