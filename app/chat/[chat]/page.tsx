import { getConversationById, getMessages } from "@/action/chat-action";
import Body from "@/components/chat/chatbody";
import Header from "@/components/chat/header";
import TextArea from "@/components/chat/textArea";
import {  fetchUsers, initializer } from "@/lib/user";
import { auth } from "@clerk/nextjs";

type Props = {
  params: {
    chat: string;
  };
};

export default async function ChatId({ params: { chat } }: Props) {
  const { userId } = await auth();
  await initializer;

  const user = await fetchUsers();
  const conversation = await getConversationById(chat);
  const messages = await getMessages(chat);

  if (!user) return null;

  if (!conversation) {
    return (
      <div className="h-full w-full lg:pl-80">
        <div className="flex h-full flex-col">
          <div className="flex h-full items-center justify-center bg-gray-100 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <div className="flex flex-col items-center text-center">
              <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                Select a chat or start a new conversation
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="h-[80px]">
      <Header conversation={conversation} conversationId={chat}/>
      </div>
      <div className="flex-grow overflow-y-auto">
        <Body initialMessages={messages} conversationId={chat} />
      </div>
      <TextArea conversationId={chat}/>
    </div>
  );
}
