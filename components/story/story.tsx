import {fetchStories } from "@/lib/data";
import CardStory from "./Stories";
import { UserStory } from "./UserStory";
import { FetchStory } from "@/action/story-action";

const Story = async ({ user }: { user: any }) => {
 
const story = await FetchStory()

  const allStories = await fetchStories();
  console.log(allStories.length, "flattened stories");


  const usersWithStories = allStories.filter((user) => 
    allStories.some((story) => story.userid === user.userid && story.stories.length > 0)
  );

  return (
    <div className="flex w-[550px] space-x-2 overflow-x-scroll scroll-smooth rounded-lg border-stone-500 bg-white shadow-sm scrollbar-hide">
      <div className="mx-2 my-2">
      </div>
      <UserStory story={story!} image={user.imageUrl!} username={user.username}/>
      {usersWithStories.map(async (user,index) => {
   
        return (
          <div key={user.id}>
            
          <CardStory
            
            img={user.imageUrl!}
            username={user}
            fetchStories={usersWithStories}
            currenUserIndex={index} 
           
           
          />
          </div>
        );
      })}
    </div>
  );
};

export default Story;
