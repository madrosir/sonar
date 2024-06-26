"use server"
import Profile from "@/components/profile/profile";
import {   fetchUserProfile, initializer } from "@/lib/user";
import { error } from "console";

export default async function Home( ) {
  
  const profile = await fetchUserProfile()
  await initializer();

  
   if (!profile) {throw error("User not found")}
   
  return (
    <main className="flex min-h-screen w-full justify-between">
      
     
       <Profile profile={profile}/>
      
      <div className="rounded-l-5xl flex w-[400px] bg-[#E4E9F2]">
   
      </div>
    </main>
  );
}
