"use server";

import { CreatePost, DeletePost, UpdatePost } from "@/lib/Schema";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
const { userId } = auth();
if (!userId)  {
  throw new Error("Unauthorized");
}
export const createPost = action(CreatePost, async ({ content, imageurl,userId }) => {
  try {
   
    await db.post.create({ data: { content, imageurl, userId:userId } });

    revalidatePath("/");
    return { success: "Post created successfully" };
  } catch (error) {
   
    console.error("Error creating post:", error);
    return { failure: "An error occurred while creating the post" };
  }
});

export const PostDelete = action(DeletePost, async ({ id,userId }) => {
  try {
   
    await db.post.delete({ where: { id,userId } });

    revalidatePath("/");
    return { success: "Post created successfully" };
  } catch (error) {
   
    console.error("Error creating post:", error);
    return { failure: "An error occurred while creating the post" };
  }
});

export const PostEdit = action(UpdatePost, async ({ id, imageurl, content, userId }) => {
  try {
    const updatedPost = await db.post.update({
      where: { id: id },
      data: {
        imageurl,
        content,
        userId
      }
    });

    revalidatePath("/");
    return { success: "Post updated successfully", post: updatedPost };
  } catch (error) {
    console.error("Error updating post:", error);
    return { failure: "An error occurred while updating the post" };
  }
});
  