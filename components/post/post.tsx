import { fetchPosts } from "@/lib/data";
import PostCard from "./post-card";

import { auth } from "@clerk/nextjs";

async function Posts() {
  const {userId} =  await auth()
  if(!userId) return null
 
  const posts = await fetchPosts();
 
    
 
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id}  post={post} userId={userId}/>
        
      ))}
      
    </>
  );
}

export default Posts;