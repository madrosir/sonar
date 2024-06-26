"use server"
import Profile from "@/components/profile/profile";
import {  fetchProfile, initializer } from "@/lib/user";
import { error } from "console";

type Props = {
  params:{
    username:string
  }}
export default async function Home({params:{username} }: Props ) {
  
  const profile = await fetchProfile(username)
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
