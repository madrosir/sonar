"use server"

import { updateSchema } from "@/lib/Schema";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { auth, clerkClient, } from "@clerk/nextjs";



export const changeName = action(updateSchema, async ({ username ,name,bio,email ,imageUrl}) => {
  const params = { username: username, name: name, email: email, imageUrl: imageUrl};


  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
     await clerkClient.users.updateUser(userId, params);
    const updateUser = await db.user.update({ 
      where: {
        
    
        userid: userId
      },
      data: {
        name,
        username,
        bio,
        email,
        imageUrl
      },
    });
   console.log(updateUser, "updateUser");
    return updateUser;
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update user.",
    };
  }
});