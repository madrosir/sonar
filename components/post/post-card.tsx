"use client";

import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";
import { Card } from "../ui/card";
import PostActions from "./postAction";
import Timestamp from "../Timestamp";
import Image from "next/image";
import { Button } from "../ui/button";
import { PostDelete } from "@/action/post-action";
import { useAction } from "next-safe-action/hooks";
import Comments from "../comment/Comments";

function Post({ post, userId }: { post: any; userId: string }) {
  const { execute, result } = useAction(PostDelete, {
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });

  const image = post.imageurl!;
  const username = post.user.username;

  return (
    <div className="mb-10 flex max-w-xl flex-col justify-center space-y-2.5 px-4 lg:mx-72">
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
              Dubai, United Arab Emirates
            </p>
          </div>
        </div>
      </div>

      {image ? (
        <Card className="relative w-full rounded-none border-none bg-transparent shadow-none">
          <div className="relative flex h-full w-full">
            <Image
              src={image}
              alt="Post Image"
              height={1000}
              width={1200}
             
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
