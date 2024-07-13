"use server"

import { db } from "@/lib/db";
import { FullMessageType } from "@/lib/definitions";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from 'next/cache';






export const  fetchUsers= async (
  conversationId: string
) => {
  try {
    const messages = await db.conversation.findMany({
      where: {
        id: conversationId
      },
     include: {
        users:true
        },
      
    });

    return messages;
  } catch (error: any) {
    return [];
  }
};


export const GetChat = async (): Promise<FullMessageType[] | null> => {
  const currentUser = auth();

  if (!currentUser.userId) {
    return [];
  }

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        users: {
          some: { userId: currentUser.userId }
        }
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
        messages: {
          include: {
            sender: true,
            seenMessages: {
              include: {
                user: true,
              },
            },
          },
        },
      }
    });

   

    return conversations as FullMessageType[] | null;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};


export const getConversationById = async (
  conversationId: string
) => {
  try {
    const currentUser = await auth();

    if (!currentUser?.userId) {
      return null;
    }
  
    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
        
        messages: {
          include: {
            sender: true,
            seenMessages:{
              include:{
                user: true,
              }
            }
            
          }
        },
      }
    });

    return conversation;
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return null;
  }
};

export const getMessages = async (
  conversationId: string
) => {
  try {
    const messages = await db.message.findMany({
      where: {
        conversationId: conversationId
      },
      include: {
        sender: true,
        seenMessages: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return messages;
  } catch (error: any) {
    return [];
  }
};





export const createConversation = async (otherUserId: string) => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const existingConversation = await db.conversation.findFirst({
      where: {
        AND: [
          { users: { some: { userId: userId } } },
          { users: { some: { userId: otherUserId } } }
        ]
      },
      include: {
        users: true
      }
    });

    if (existingConversation) {
      return existingConversation;
    }

    const newConversation = await db.conversation.create({
      data: {
        users: {
          create: [
            { userId: userId },
            { userId: otherUserId }
          ]
        }
      },
      include: {
        users: true
      }
    });

    revalidatePath("/");
    return newConversation;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw new Error("An error occurred while creating the conversation");
  }
};

























export const deleteConversation = async (conversationId: string) => {
  try {
    const { userId } = auth();
    if (!userId) {
      console.error("Unauthorized access attempt");
      throw new Error("Unauthorized");
    }

    console.log(`Attempting to delete conversation with ID: ${conversationId} for user ID: ${userId}`);

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId,
        users: {
          some: {
            userId: userId
          }
        }
      }
    });

    if (!conversation) {
      console.error("Conversation not found or user not authorized");
      throw new Error("Conversation not found or user not authorized");
    }

    console.log("Conversation found. Proceeding with deletion...");

    await db.conversation.delete({
      where: {
        id: conversationId
      }
    });

    console.log("Conversation deleted. Deleting associated messages...");

    await db.message.deleteMany({
      where: {
        conversationId: conversationId
      }
    });

    console.log("Associated messages deleted. Revalidating path...");

    await revalidatePath("/");

    console.log("Path revalidated. Deletion process complete.");

    return { success: true, message: "Conversation deleted successfully" };
  } catch (error) {
    console.error("Error deleting conversation:", error);
    throw new Error("An error occurred while deleting the conversation");
  }
};