"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { PostWithExtras } from "@/lib/definitions";
import Timestamp from "../Timestamp";
import UserAvatar from "../UserAvatar";

function MiniPost({ post }: { post: PostWithExtras }) {
  const username = post.user.username;
  const href = `/dashboard/profile/${username}`;
  
 const user = post.user;

  if (!user) return null;

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
          {/* <PostOptions
            post={post}
            userId={user.id}
            className="hidden group-hover:inline"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default MiniPost;