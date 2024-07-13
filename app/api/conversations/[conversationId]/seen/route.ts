import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await auth();
    const { conversationId } = params;

    if (!currentUser.userId) {
      console.error('Unauthorized: No user ID found');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!conversationId) {
      console.error('Invalid conversation ID');
      return new NextResponse('Invalid conversation ID', { status: 400 });
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seenMessages: true
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      console.error('Invalid conversation ID');
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    try {
    
      const seenMessage = await db.seenMessage.upsert({
        where: {
          messageId_userId: {
            messageId: lastMessage.id,
            userId: currentUser.userId,
          },
        },
        update: {}, 
        create: {
          messageId: lastMessage.id,
          userId: currentUser.userId,
        },
      });

      if(!seenMessage ){
        return new NextResponse('Error', { status: 402 });
      }
      const updatedMessage = await db.message.update({
        where: {
          id: lastMessage.id
        },
        include: {
          sender: true,
          seenMessages: true,
        },
        data: {
          seenMessages: {
            connect: {
              id: seenMessage.id
            }
          }
        }
      });
      if(!updatedMessage ){
        return new NextResponse('Error', { status: 403 });
      }
   
      await pusherServer.trigger(currentUser.userId, 'conversation:update', {
        id: conversationId,
        messages: [updatedMessage]
      });

      if (lastMessage.senderId !== currentUser.userId) {
        await pusherServer.trigger(conversationId, 'message:update', updatedMessage);
      }

      return new NextResponse('Success');
    } catch (err) {
      console.error('Error handling seen message:', err);
      return new NextResponse('Error', { status: 500 });
    }

  } catch (error) {
    console.error('Error in POST handler:', error);
    return new NextResponse('Error', { status: 500 });
  }
}
