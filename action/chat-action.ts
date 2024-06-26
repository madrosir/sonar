

"use server"

import { CreateChat, UpdateSeenMessage, createMessage, seen } from "@/lib/Schema";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { action } from "@/lib/safe-action";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from 'next/cache';


export const CreateMessage = action(createMessage, async ({ content, conversationId, senderId }) => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Start a database transaction
    const result = await db.$transaction(async (prisma) => {
      // Create the new message
      const newMessage = await prisma.message.create({
        data: {
          content,
          conversation: {
            connect: { id: conversationId }
          },
          sender: {
            connect: { id: userId }
          }
        },
        include: {
          seenMessages: true,
          sender: true
        }
      });

      // Create a seenMessage entry for the sender
      const senderSeenMessage = await prisma.seenMessage.create({
        data: {
          messageId: newMessage.id,
          userId: userId
        }
      });

      // Update the conversation with the new message
      const updatedConversation = await prisma.conversation.update({
        where: {
          id: conversationId
        },
        data: {
          lastMessageAt: new Date(),
          messages: {
            connect: {
              id: newMessage.id
            }
          }
        },
        include: {
          users: true,
          messages: {
            include: {
              seenMessages: true
            }
          }
        }
      });

      return { newMessage, updatedConversation, senderSeenMessage };
    });

    const { newMessage, updatedConversation, senderSeenMessage } = result;

    await pusherServer.trigger(conversationId, 'newMessage', newMessage);

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.userId!, 'update', {
        id: conversationId,
        messages: [lastMessage]
      });
    });

    revalidatePath("/");
    return { message: "Message created and seenMessage entry added successfully." };
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to create message and seenMessage entry." };
  }
});






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


export const GetChat = async () => {
  const currentUser =  auth();

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
          some:{userId:currentUser.userId}
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
            seenMessages: true,
            
          }
        },
      }
    });

    return conversations;
  } catch (error: any) {
    return null
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

    // Check if a conversation already exists between these users
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
      // If conversation exists, return it
      return existingConversation;
    }

    // If no existing conversation, create a new one
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