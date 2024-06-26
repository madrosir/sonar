"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import FollowButton from "../followBotton";
import {  UserWithExtras } from "@/lib/definitions";
import { notFound, useRouter } from "next/navigation";

import { createConversation } from "@/action/chat-action";
import { useUser } from "@clerk/nextjs";

const  Profile =({profile}:{  profile:UserWithExtras;}) => {
  const router = useRouter()
const {user} = useUser()
if (!user){return ("User not found")}
   const session = user
const isCurrentUser = user.id === profile?.userid;
  const isFollowing = profile.followedBy.some(
    
    (user) => user.follower.userid === session.id
    
  );

  if (!profile) {
    notFound();
  }
  const handleStartConversation = async () => {
    try {
      const conversation = await createConversation(profile.userid);
      router.push(`/chat/${conversation.id}`);
    } catch (error) {
      console.error("Failed to start conversation:", error);
     
    }
  };
console.log(profile.userid)
    return ( 
        <div className="ml-10 flex h-screen w-full items-center">
            <div className="ml-10 mr-10 h-[950px] w-[400px] rounded-2xl bg-[#ffffff] shadow-xl">
              <div className="flex justify-center">
                <Image src={profile.imageUrl!} alt="avatar" className="mt-10 rounded-3xl" width={140} height={160}/>
                
              </div>
              <div>
              <p className="mt-5 text-center text-3xl font-bold">{profile.name}</p>
              
              <p className="mt-5 text-center text-sm font-light">@{profile.username}</p>
              <div className="mt-5 flex justify-center">
              <p>followers:</p>   <p>following:</p>   <p>posts:</p>
              </div>
              <div className="mt-5 flex w-full">
                <Button className="ml-5 w-full bg-[#0095f6] text-white" >Edit Profile</Button>
                <Button className="ml-5 mr-5 w-full bg-[#0095f6] text-white" onClick={handleStartConversation}>Message</Button>
              {isCurrentUser ?( "") :(<FollowButton profileId={profile.userid} isFollowing={isFollowing}  buttonClassName={
             "bg-neutral-700 dark:hover:bg-neutral-700/40"
          }/>)}
              </div>
              <div className="mt-5 justify-center">
                <p className="mx-5 mt-10 text-2xl font-bold" > bio</p>
              
              <p className="mx-5 mt-10 break-all text-center text-sm font-light" >bio:{profile.bio}</p>
              </div>
              </div>
              <p className="ml-5 mt-10 text-lg font-bold">friends</p>
            </div>
            <div className="ml-10 h-[950px] w-[900px] rounded-2xl bg-[#ffffff] shadow-xl">
             
            </div>
        </div>
    );
}
 
export default Profile;
