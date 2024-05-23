"use client"
import UserAvatar from "@/components/UserAvatar";
import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
import Link from "next/link";

import { auth } from "@clerk/nextjs";
import { Card } from "../ui/card";
import PostActions from "./postAction";
import Timestamp from "../Timestamp";
import Comment1 from "../comment/Comments";
import { fetchUser } from "@/lib/user";
import Image from "next/image";
import { Button } from "../ui/button";
import { PostDelete } from "@/action/post-action";
import { useAction } from "next-safe-action/hooks";
import Comments from "../comment/Comments";
import LikeComment from "../comment/LikeComment";


 function Post({post ,userId }: {  post:any ; userId:string}) {
  const { execute, result} = useAction(PostDelete
    , {
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error,"error");
      },
    });
 
  const  image = post.imageurl! 

const username = post.user.username
const onDelete = () => {
  execute({
      id:post.id
  })
}


  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex items-center space-x-3">
          <UserAvatar user={post.user} />
          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold">{username}</span>
              <span
                className="text-xs font-medium text-neutral-500 dark:text-neutral-400"
              >
                •
              </span>
            <Timestamp createdAt={post.createdAt} /> 
            </p>
            <p className="text-xs font-medium text-black dark:text-white">
              Dubai, United Arab Emirates
            </p>
            <form action={onDelete}>
              <Button>delete</Button>
            </form>
          </div>
        </div>

       
      </div>

      {image ? <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
      <Image
          src={image}
          alt="Post Image"
          fill
          className="object-cover sm:rounded-md"
        /> 
      </Card>:<p></p>}
      <PostActions post={post} userId={userId} className="px-3 sm:px-0"  />
    

      {post.content && (
        <div className="flex items-center space-x-2 px-3 text-sm font-medium leading-none sm:px-0">
          <Link href={`/${post.user.username}`} className="font-bold">
            {post.user.username}
          </Link>
          <p>{post.content}</p>
        </div>
      )}
      <Comments
      postId={post.id}
      comments={post.comments}
      user={post.user} 
     />
     
    </div>
  );
}

export default Post;