"use client";

import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";
import { Card } from "../ui/card";
import PostActions from "./postAction";
import Timestamp from "../Timestamp";
import Image from "next/image";

import Comments from "../comment/Comments";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { PopoverContent } from "../ui/popover";
import { DeletePost } from "./Delete-Post";
import { EditPost } from "./Edit-post";

function Post({ post, userId }: { post: any; userId: string }) {
 

  const image = post.imageurl!;
  const username = post.user.username;

  return (
    <div className="mb-10 flex flex-col justify-center space-y-2.5 px-4 lg:mx-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <UserAvatar user={post.user} />
          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold">{username}</span>
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                •
              </span>
              <Timestamp createdAt={post.createdAt} />
            </p>
            <p className="text-xs font-medium text-black dark:text-white">
             
            </p>
          </div>
        </div>
      {userId === post.userId ? <Popover>
  <PopoverTrigger ><IoEllipsisHorizontalSharp />
  </PopoverTrigger>
  <PopoverContent  className='w-full'>
  <div> <EditPost post={post} /></div><DeletePost postId={post.id}/></PopoverContent>
  
</Popover>:''}
      </div>

      {image ? (
        <Card className="relative w-full rounded-none border-none bg-transparent shadow-none">
          <div className="relative flex h-full w-full">
            <Image
              src={image}
              alt="Post Image"
              height={100}
              width={500}
             
              className="rounded-md"
            />
          </div>
        </Card>
      ) : (
        <p></p>
      )}
      <PostActions post={post} userId={userId} className="px-3 sm:px-0" />

      {post.content && (
        <div className="flex items-center space-x-2 text-sm font-medium leading-none">
          <Link href={`/profile/${post.user.username}`} className="font-bold">
            {post.user.username}
          </Link>
          <p>{post.content}</p>
        </div>
      )}
      <Comments postId={post.id} comments={post.comments} user={post.user} />
    </div>
  );
}

export default Post;
