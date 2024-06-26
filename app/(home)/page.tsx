import { deleteOldPosts } from "@/action/story-action";
import { CreatePost } from "@/components/post/create-post";
import Posts from "@/components/post/post";
import Story from "@/components/story/story";
import { PostWithExtras } from "@/lib/definitions";
import { fetchUser, initializer } from "@/lib/user";
const cron = require('node-cron');

export default async function Home({ post }: { post: PostWithExtras }) {
  await initializer();

  const user = await fetchUser();

  cron.schedule('0 0 * * *', deleteOldPosts, {
    scheduled: true,
    timezone: "UTC"
  });

  return (
    <main className="flex min-h-screen w-full">
      <div className="w-full">
        <div className="flex flex-col justify-center space-y-4">
          <div className="p-4">
            <Story user={user} />
          </div>
          <div>
            <CreatePost userImage={user!.imageUrl!} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <Posts post={post} />
          </div>
        </div>
      </div>

    
    </main>
  );
}
