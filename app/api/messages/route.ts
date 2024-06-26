import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function POST(
  request: Request,
) {
  try {
    const User = await currentUser();
    const body = await request.json();
    const {
      message,
      
      conversationId
    } = body;

    if (!User?.id ) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const newMessage = await db.message.create({
      include: {
        seenMessages: true,
        sender: true
      },
      data: {
        content: message,
       
        conversation: {
          connect: { id: conversationId }
        },
        sender: {
          connect: { userid: User.id }
        },
        seenMessages: {
          create: {
            userId: User.id
          }
        },
      }
    });

    
    const updatedConversation = await db.conversation.update({
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

    await pusherServer.trigger(conversationId, 'messages:new', newMessage);

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.userId!, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage]
      });
    });

    return NextResponse.json(newMessage)
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES')
    return new NextResponse('Error', { status: 500 });
  }
}