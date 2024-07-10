import { EditProfile } from "@/components/profile/edit-profile";

import { fetchUser, initializer } from "@/lib/user";
import { Toaster } from "sonner";

export default async function Setting() {
  const data= await fetchUser()
  await initializer();
   
   
  return (
    <main className="flex min-h-screen w-full justify-between">
      
     <EditProfile validNotes={data} />
   
      <div className="rounded-l-5xl flex bg-[#E4E9F2]">
      <Toaster />
      </div>
    </main>
  );
}
