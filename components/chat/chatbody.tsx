'use client';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { debounce, find } from "lodash";
import { MessageType } from "@/lib/definitions";
import { pusherClient } from "@/lib/pusher";
import MessageBox from "./MessageBox";

interface BodyProps {
  initialMessages: MessageType[]
  conversationId: string;
}

const Body = ({ initialMessages=[], conversationId }:BodyProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const markAsSeen = debounce(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
      .catch((error) => {
        console.error('Failed to mark messages as seen:', error);
      });
  }, 100);

  useEffect(() => {
    markAsSeen();
  }, [markAsSeen]);

  useEffect(() => {
    

    pusherClient.subscribe(conversationId)

    const messageHandler = (message: MessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message]
      });
    };

    const updateMessageHandler = (newMessage: MessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
        return currentMessage;
      }))
    };

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId])
  useEffect(() =>{
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages])
  

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}

export default Body;