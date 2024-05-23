"use server";

import {  CreateStory,  } from "@/lib/Schema";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
const { userId } = auth();
if (!userId)  {
  throw new Error("Unauthorized");
}
export const createStory = action(CreateStory, async ({ imageUrl, videoUrl }) => {
  try {
   
    await db.story.create({ data: { imageUrl, videoUrl,} });

    revalidatePath("/");
    return { success: "Post created successfully" };
  } catch (error) {
   
    console.error("Error creating post:", error);
    return { failure: "An error occurred while creating the post" };
  }
});