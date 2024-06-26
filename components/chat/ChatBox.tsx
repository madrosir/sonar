'use client';

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {  User } from "@prisma/client";
import { format } from "date-fns";
import { FullMessageType } from "@/lib/definitions";
import useOtherUser from "@/hook/useOtherUser";
import Avatar from "../Avatar";
import { cn } from "@/lib/utils";




interface ConversationBoxProps {
  data: FullMessageType,
  selected?: boolean;
  user:User
 
}

const ConversationBox = ({ 
  data, 
  selected ,
  user,
}:ConversationBoxProps) => {
 
  const otherUser = useOtherUser(data)
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/chat/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => user.userid, [user.userid]);
  
  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seenMessages || [];

    if (!userEmail) {
      return false;
    }

    return seenArray
      .filter((user) => user.userId === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.content) {
      return lastMessage?.content
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return ( 
    <div
      onClick={handleClick}
      className={cn(`
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3
        mb-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        `,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
       <Avatar user={otherUser?.user} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          
          <div className="mb-1 flex items-center justify-between">
          {otherUser?.user.username}

            <p className="text-md font-medium text-gray-900">
             
    
            </p>
            {lastMessage?.createdAt && (
              <p 
                className="text-xs font-light text-gray-400"
              >
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p 
            className={cn(`
              truncate 
              text-sm
              `,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}>
              {lastMessageText}
            </p>
        </div>
      </div>
    </div>
  );
}
 
export default ConversationBox;