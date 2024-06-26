'use client';

import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import {  MessageType } from "@/lib/definitions";
import { useUser } from "@clerk/nextjs";
import Avatar from "../Avatar";
import { cn } from "@/lib/utils";
import { IoCheckmark, IoCheckmarkDoneSharp } from "react-icons/io5";


interface MessageBoxProps {
  data: MessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ 
  data, 
  isLast
}) => {
  const {user} = useUser()
  if (!user) {return null }
  


  const isOwn = user.id === data.senderId
  const seenCount = (data.seenMessages || [])
  .filter((user) => user.userId !== data?.sender?.id)
  .length;

   
 
  

  return ( 
    <div className={cn('flex gap-3 p-4', isOwn && 'justify-end')}>
    <div className={cn(isOwn && 'order-2')}>
      <Avatar user={data.sender} />
    </div>
    <div className={cn('flex flex-col gap-2', isOwn && 'items-end')}>
      <div className="flex items-center gap-1">
        <div className="text-sm text-gray-500">
          {data.sender.name}
        </div>
        <div className="text-xs text-gray-400">
          {format(new Date(data.createdAt), 'p')}
        </div>
      </div>
      <div className={cn(
      'text-sm w-fit overflow-hidden', 
      isOwn ? 'bg-sky-500 text-white' : 'bg-gray-200', 
      data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
    )}>
       
      
          <div>{data.content}</div>
       
      </div>
      {isLast && isOwn && seenCount > 0 && (
          <div className="text-xs font-light text-gray-500">
            {seenCount === 1 ? (
              <IoCheckmark  />
            ) : (
              <IoCheckmarkDoneSharp className="text-blue-500" />
            )}
          </div>
        )}

    </div>
  </div>
 );
}
 
export default MessageBox;