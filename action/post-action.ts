"use server";

import { CreatePost, DeletePost } from "@/lib/Schema";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
const { userId } = auth();
if (!userId)  {
  throw new Error("Unauthorized");
}
export const createPost = action(CreatePost, async ({ content, imageurl }) => {
  try {
   
    await db.post.create({ data: { content, imageurl, userId } });

    revalidatePath("/");
    return { success: "Post created successfully" };
  } catch (error) {
   
    console.error("Error creating post:", error);
    return { failure: "An error occurred while creating the post" };
  }
});

export const PostDelete = action(DeletePost, async ({ id }) => {
  try {
   
    await db.post.delete({ where: { id } });

    revalidatePath("/");
    return { success: "Post created successfully" };
  } catch (error) {
   
    console.error("Error creating post:", error);
    return { failure: "An error occurred while creating the post" };
  }
});

  