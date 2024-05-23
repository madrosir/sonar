
import Image from "next/image";
import { Button } from "../ui/button";
import FollowButton from "../followBotton";
import {  UserWithExtras } from "@/lib/definitions";
import { auth, currentUser } from "@clerk/nextjs";
import { error } from "console";
import { notFound } from "next/navigation";

const  Profile =async ({profile}:{  profile:UserWithExtras;}) => {
  
const user = await currentUser()
if (!user){throw error("User not found")}
   const session = user
const isCurrentUser = user.id === profile?.userid;
  const isFollowing = profile.followedBy.some(
    
    (user) => user.followerId === session.id
    
  );
  
  if (!profile) {
    notFound();
  }
 console.log(user.id)
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
                <Button className="ml-5 mr-5 w-full bg-[#0095f6] text-white" >Message</Button>
              {isCurrentUser ?( "") :(<FollowButton profileId={profile.id} isFollowing={isFollowing}  buttonClassName={
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
