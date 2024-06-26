import { fetchPosts } from "@/lib/data";
import PostCard from "./post-card";
import { Comment } from "@prisma/client";
import PostActions from "./postAction";
import { PostWithExtras } from "@/lib/definitions";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

async function Posts( {post } :{post:PostWithExtras}) {
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