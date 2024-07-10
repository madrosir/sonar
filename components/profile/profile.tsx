"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import FollowButton from "../followButton";
import UserProfile from "@/lib/definitions";
import { notFound, useRouter } from "next/navigation";

import { createConversation } from "@/action/chat-action";
import { useUser } from "@clerk/nextjs";
import { ProfilePost } from "./profilePost";

const  Profile =({profile }:{  profile:UserProfile;  }) => {
  const router = useRouter()
const {user} = useUser()
if (!user){return null}
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
  const hadleEdite=() =>{
    router.push(`/setting`)
  }
  const follower = profile.followedBy.length
  const following = profile.following.length
console.log(follower)
    return ( 
        <div className="my-5 ml-10 flex min-h-min w-full items-center">
            <div className="h-full w-[400px] rounded-2xl bg-[#ffffff] shadow-xl">
              <div className="flex justify-center">
                <Image src={profile.imageUrl!} alt="avatar" className="mt-10 rounded-3xl" width={140} height={160}/>
                
              </div>
              <div>
              <p className="mt-5 text-center text-3xl font-bold">{profile.name}</p>
              
              <p className="mt-5 text-center text-sm font-light">@{profile.username}</p>
              <div className="mx-20 mt-5 flex justify-between">
              <p className="font-semibold">Followers:{follower}</p>   <p className="font-semibold">following:{following}</p>   
              </div>
              <div className="mt-5 flex w-full justify-center">
                {isCurrentUser ?<Button className="ml-5 mr-5 w-[150px] bg-[#0095f6] text-white" onClick={hadleEdite}>Edit Profile</Button> :""}
                <Button className="mr-5 w-[150px] bg-[#0095f6] text-white" onClick={handleStartConversation}>Message</Button>
              {isCurrentUser ?( "") :(<FollowButton profileId={profile.userid} isFollowing={isFollowing}  buttonClassName={
             "bg-neutral-700 dark:hover:bg-neutral-700/40 w-[150px] h-[40px]"
          }/>)}
              </div>
              <div className="mt-5 justify-center">
                <p className="mx-5 mt-10 text-2xl font-bold" > bio</p>
              
              <p className="mx-5 break-all text-sm font-light" >bio:{profile.bio}</p>
              </div>
              </div>
              <div className="mt-10 w-full pl-4 text-lg font-bold">following
                <div className="grid grid-cols-6">
                {profile.following.slice(0,6).map((user)=>(
                  <div key={user.followingId} className="">
                   <Image
                   src={user.following.imageUrl!}
                   alt ="following Image"
                   width={50}
                   height={50}
                   className="rounded-2xl"
                   />
                  </div>
                ))}
                </div>
              </div>
            </div>
            <div className="ml-5 mr-5 h-full w-[700px] rounded-2xl bg-[#ffffff] shadow-xl">
             <ProfilePost profile={profile} isCurrentUser={isCurrentUser}/>
            </div>
        </div>
    );
}
 
export default Profile;
