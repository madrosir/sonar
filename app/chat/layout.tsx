import { GetChat } from "@/action/chat-action";
import { Chat } from "@/components/chat/chat";
import SideBar from "@/components/nav/sidebar";
import { fetchFollowing } from "@/lib/data";
import { fetchUser, fetchUsers, initializer } from "@/lib/user";

const Message = async ({ children }: { children: React.ReactNode }) => {
  await initializer;
  const users = await fetchUsers();
  const conversations = await GetChat();
  const myUser = await fetchUser();

  if (!users || !myUser || !conversations) return null;

  return (
    <main className="flex h-screen bg-gray-800">
      <div className="sticky top-0 h-screen w-[350px] bg-gray-900 shadow-xl">
        <SideBar />
      </div>
      <div className="flex bg-[#f7f7f7]">
        <div className="w-[350px] border-r border-gray-300 bg-white">
          <Chat user={users} conversations={conversations} myUser={myUser} />
        </div>
        
      </div>
      <div className="w-full border border-r-2 bg-[#f7f7f7]">
          {children}
        </div>
    </main>
  );
};

export default Message;
