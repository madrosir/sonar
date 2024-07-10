"use server";

import {  CreateStory,  } from "@/lib/Schema";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";



export const createStory = action(CreateStory, async ({ url,durations,type  }) => {
  try {
    const { userId } = auth();
    if (!userId)  {
      throw new Error("Unauthorized");
    }
    await db.story.create({ data: { url,userId:userId ,duration:5000 ,type:"image"} });

    revalidatePath("/");
    return { success: "Post created successfully" };
  } catch (error) {
   
    console.error("Error creating post:", error);
    return { failure: "An error occurred while creating the post" };
  }
});

export async function deleteOldPosts() {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24);

  try {
    const result = await db.story.deleteMany({
      where: {
        createdAt: {
          lt: twentyFourHoursAgo,
        },
      },
    });
    
    console.log(`Deleted ${result.count} posts`);
  } catch (error) {
    console.error('Error deleting old posts:', error);
  }
}

export async function FetchStory() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const stories = await db.story.findMany({
      where: { userId: userId }
    });

    return stories;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw new Error("An error occurred while fetching the stories");
  }
}