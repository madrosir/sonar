import CreateStory from "./CreateStory";
import { fetchFollowing, fetchStories } from "@/lib/data";
import CardStory from "./Stories";

const Story = async ({ user }: { user: any }) => {
 
  const followingUsers = await fetchFollowing();


  const allStories = await fetchStories();
  console.log(allStories.length, "flattened stories");


  const usersWithStories = allStories.filter((user) => 
    allStories.some((story) => story.userid === user.userid && story.stories.length > 0)
  );

  return (
    <div className="mx-60 space-x-2 overflow-x-scroll scroll-smooth rounded-lg border-stone-500 bg-white shadow-sm scrollbar-hide">
      <CreateStory user={user} />
      {usersWithStories.map(async (user,index) => {
   
        const fetch = await fetchStories()
        return (
          <CardStory
            key={user.id}
            img={user.imageUrl!}
            username={user}
            fetchStories={usersWithStories}
            currenUserIndex={index} 
           
           
          />
        );
      })}
    </div>
  );
};

export default Story;
