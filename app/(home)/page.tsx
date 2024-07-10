import { deleteOldPosts } from "@/action/story-action";
import { CreatePost } from "@/components/post/create-post";
import Posts from "@/components/post/post";
import Story from "@/components/story/story";
import { fetchUser, initializer } from "@/lib/user";
import { revalidatePath } from "next/cache";
const cron = require('node-cron');

export default async function Home() {
  await initializer();

  const user = await fetchUser();
  if(!user ){
    revalidatePath("/sign-in");
    return null
  }

  cron.schedule('0 0 * * *', deleteOldPosts, {
    scheduled: true,
    timezone: "UTC"
  });

  return (
    <main className="flex min-h-screen w-full">
      <div className="w-full">
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex w-full justify-center p-4">
            <Story user={user} />
          </div>
          <div>
            <CreatePost userImage={user.imageUrl!} />
          </div>
          <div className="flex w-full flex-col items-center">
            <Posts/>
          </div>
        </div>
      </div>

    
    </main>
  );
}
