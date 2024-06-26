import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await auth();

    if (!currentUser?.userId) {
      console.error("Unauthorized access attempt");
      return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log(`Attempting to delete conversation with ID: ${conversationId} for user ID: ${currentUser.userId}`);

    const existingConversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });

    if (!existingConversation) {
      console.error("Conversation not found");
      return new NextResponse('Invalid ID', { status: 400 });
    }

    // Delete related SeenMessage records
    await db.seenMessage.deleteMany({
      where: {
        message: {
          conversationId: conversationId
        }
      }
    });

    // Delete related messages
    await db.message.deleteMany({
      where: {
        conversationId: conversationId
      }
    });

    // Delete related ConversationUser records
    await db.conversationUser.deleteMany({
      where: {
        conversationId: conversationId
      }
    });

    // Now delete the conversation
    const deletedConversation = await db.conversation.delete({
      where: {
        id: conversationId
      }
    });

    // Notify users about the deletion
    existingConversation.users.forEach((user) => {
      if (user.userId) {
        try {
          pusherServer.trigger(user.userId, 'conversation:remove', existingConversation);
        } catch (pusherError) {
          console.error("Pusher error:", pusherError);
        }
      }
    });

    return NextResponse.json({ success: true, message: "Conversation deleted successfully" });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
