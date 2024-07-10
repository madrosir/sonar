import { Input } from "../ui/input";
import { User } from "@prisma/client";

import { FullMessageType } from "@/lib/definitions";
import ConversationList from "./ConversationList";

interface Props {
  conversationId?: string;
  conversations?: FullMessageType[];
  myUser ?: User;
}

export const Chat = ({  conversationId, conversations, myUser }: Props) => {
 

  return (
    <div className="grid h-screen w-[300px] md:grid-cols-[350px_1fr]">
      <div className="overflow-y-auto border-r border-gray-200 bg-gray-100">
        <div className="sticky top-0 border-b border-gray-200 bg-gray-100 p-4">
          <Input placeholder="Search chats" className="w-full bg-white" />
        </div>
      
          
            <ConversationList
              myUser={myUser!}
              conversationId={conversationId!}
              title="Messages"
              initialItems={conversations!}
            />
        
      </div>
    </div>
  );
};
