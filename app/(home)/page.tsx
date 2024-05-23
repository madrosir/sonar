import { CreatePost } from "@/components/post/create-post";
import Posts from "@/components/post/post";
import { PostWithExtras } from "@/lib/definitions";

import { fetchUser, initializer } from "@/lib/user";


export default async function Home({post} :{post:PostWithExtras}) {
await initializer()
const user = await fetchUser()

  return (
    <main className="flex min-h-screen justify-between">
      hello world
      <div className="w-full border border-red-700">
      <Posts post={post} />
      </div>
      <div className="w-[400px] bg-[#f7f9fc]">
      <CreatePost  validNotes={user} /> 
      
        </div>
       
      <div className="rounded-l-5xl flex w-[400px] bg-[#E4E9F2]">
      
      </div>
    </main>
  );
}
