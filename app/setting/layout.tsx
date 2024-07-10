import FollowButton from "@/components/followButton";
import { RightSideBar } from "@/components/post/nav/RightSidebar";
import SideBar from "@/components/post/nav/sidebar";

import { QueryProvider } from "@/components/providers/query-provider";
import {fetchFollowers, fetchUser, fetchUsers } from "@/lib/user";
import { User } from "@prisma/client";
import Image from "next/image";
import { Toaster } from "sonner";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
    const users = await fetchUsers()
    const follower = await fetchFollowers()
    const user = await fetchUser();

  
    return (
        <main>     <QueryProvider>
                        <div className="flex bg-[#F7F9FC]">
                <div className="shadow-4xl fixed left-0 top-0 min-h-screen text-white">
                    <SideBar user={user!}/>
                </div>
                <div className="ml-[300px] mr-[300px] w-full bg-[#F7F9FC]">
                    {children}
                </div>
                <div className="rounded-l-5xl fixed right-0 top-0 h-full w-[400px] bg-[#E4E9F2]">
                     <RightSideBar/>
                     <div>
                        <p className="ml-10 mt-10 text-lg font-semibold">Suggestions you might like</p>
                    {users.map((item :User)=>{
                        const isFollowing =  follower!.some(
    
                            (user) => user.followingId === item.userid
                            
                          );
                        
                        return(
                            <div className="flex items-center justify-between" key={item.id}>
                             <div  className="relative mb-5 mt-3 rounded-md p-4">
                             <div className='relative flex h-10'>
                                  <Image 
                                  src={item.imageUrl!}
                                      alt='User Image'
                                    width={40}
                                     height={40}
                                       className='rounded-full'
                                             />
                                    <div className="ml-2 flex flex-col justify-center">
                                  <span>{item.username}</span>
                               <p className='mt-1'>{item.name}</p>
                                </div>
                               </div>
                               
                              </div>
                              <div className="mr-10">
                                <FollowButton profileId={item.userid} isFollowing={isFollowing} buttonClassName={
             "bg-neutral-700 dark:hover:bg-neutral-700/40"
          }/></div>
                             </div>
)})}
                     </div>
                </div>
                
            </div>
            <Toaster />
            </QueryProvider>
        </main>
    );
}

export default HomeLayout;
