"use client"
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { FullMessageType } from "@/lib/definitions";
import { find } from 'lodash';
import ChatBox from "./ChatBox";

interface ConversationListProps {
  initialItems: FullMessageType[];
  title?: string;
  conversationId: string;
  myUser: User;
}

const ConversationList = ({ initialItems, myUser, conversationId }: ConversationListProps) => {
  const [items, setItems] = useState(initialItems);

  const router = useRouter();

  useEffect(() => {
    if (!myUser.userid) {
      return;
    }

    pusherClient.subscribe(myUser.userid);

    const updateHandler = (conversation: FullMessageType) => {
      setItems((current) => 
        current.map((currentConversation) => 
          currentConversation.id === conversation.id
            ? { ...currentConversation, messages: conversation.messages }
            : currentConversation
        )
      );
    };

    const newHandler = (conversation: FullMessageType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullMessageType) => {
      setItems((current) => current.filter((convo) => convo.id !== conversation.id));
    };

    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:remove', removeHandler);

    return () => {
      pusherClient.unsubscribe(myUser.userid);
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:new', newHandler);
      pusherClient.unbind('conversation:remove', removeHandler);
    };
  }, [myUser.userid, router]);

  return (
    <aside >
      <div className="px-5">
        <div className="mb-4 flex justify-between pt-4">
          <div className="text-2xl font-bold text-neutral-800">Messages</div>
          <div
           
            className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 transition hover:opacity-75"
          >
          
          </div>
        </div>
        {items.map((item) => (
          <ChatBox key={item.id} data={item} user={myUser} selected={conversationId === item.id} />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
