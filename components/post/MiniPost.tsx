"use client";

import Link from "next/link";
import { PostWithExtras } from "@/lib/definitions";
import Timestamp from "../Timestamp";
import UserAvatar from "../UserAvatar";
import { useUser } from "@clerk/nextjs";

function MiniPost({ post }: { post: PostWithExtras }) {
  const {user} = useUser()
  if (!user) return null;
  const username = user.username 
  const href = `/dashboard/profile/${username}`;
  
 

  

  return (
    <div className="group flex items-start space-x-2.5 p-3 px-3.5">
      <Link href={href}>
        <UserAvatar user={post.user} />
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 text-sm leading-none">
          <Link href={href} className="font-semibold">
            {username}
          </Link>
          <p className="font-medium">{post.content}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <Timestamp createdAt={post.createdAt} />
         
        </div>
      </div>
    </div>
  );
}

export default MiniPost;