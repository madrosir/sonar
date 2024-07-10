"use server"
import Profile from "@/components/profile/profile";
import {   fetchUserProfile, initializer } from "@/lib/user";

export default async function Home( ) {
  
  const profile = await fetchUserProfile()
  await initializer();
  
  
   
  return (
    <main className="flex min-h-screen justify-between">
      
     
       <Profile profile={profile!} />
      
     
    </main>
  );
}
