import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
) {
  try {
    const user = await currentUser();
    const body = await request.json();
    const { userId } = body;

    if (!user?.id || !user?.emailAddresses) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if the conversation already exists
    const existingConversation = await db.conversation.findFirst({
      where: {
        AND: [
          { users: { some: { userId: user.id } } }, // Current user is in the conversation
          { users: { some: { userId: userId } } }, // Target user is in the conversation
          { users: { every: { userId: { in: [user.id, userId] } } } } 
        ]
      }
    });

    if (existingConversation) {
      return NextResponse.json(existingConversation);
    }

    
    const newConversation = await db.conversation.create({
      data: {
        users: {
          createMany: {
            data: [
              { userId: user.id }, 
              { userId: userId }  
            ]
          }
        }
      },
      include: {
        users: true
      }
    });

    pusherServer.trigger(user.id, 'conversation:new', newConversation);
    pusherServer.trigger(userId, 'conversation:new', newConversation);

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
