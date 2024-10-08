"use client";
import UserAvatar from "@/components/UserAvatar";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import useMount from "@/hook/useMount";
import Comment from "../comment/Comment";
import ViewPost from "./ViewPost";
import MiniPost from "./MiniPost";
import ActionIcon from "../ActionIcon";
import CommentForm from "../comment/CommentForm";
import LikeButton from "../like";
import ShareButton from "../ShareButton";
import BookmarkButton from "../BookmarkButton";
import { CommentWithExtras } from "@/lib/definitions";
import { LuMessageCircle } from "react-icons/lu";
import { useUser } from "@clerk/nextjs";

function PostView({ id, post, userId }: { id: string; post: any; userId: string }) {
  const { user } = useUser();

  const image = post.imageurl;
  const inputRef = useRef<HTMLInputElement>(null);
  const username = user?.username;
  const href = `/profile/${username}`;
  const mount = useMount();
  if (!mount) return null;

  const hasReplies = (comment: CommentWithExtras) => !comment.parentId;

  return (
    <Dialog>
      <DialogTrigger asChild>  
        <ActionIcon>
          <div>
          <LuMessageCircle className={"h-6 w-6"} />
          </div>
        </ActionIcon>
      </DialogTrigger>
      <DialogContent className="flex h-full max-h-[500px] flex-col items-start gap-0 p-0 md:max-w-3xl md:flex-row lg:max-h-[700px] lg:max-w-5xl xl:max-h-[800px] xl:max-w-6xl">
        <div className="flex w-full max-w-md flex-col justify-between md:order-2 md:h-full">
          <DialogHeader className="flex flex-row items-center space-x-2.5 space-y-0 border-b py-4 pl-3.5 pr-6">
            <Link href={href}>
              <UserAvatar user={post.user} />
            </Link>
            <Link href={href} className="text-sm font-semibold">
              {username}
            </Link>
          </DialogHeader>

          <ScrollArea className="hidden flex-1 border-b py-1.5 md:inline">
            <MiniPost post={post} />
            {post.comments && post.comments.length > 0 && (
              <>
                {post.comments.filter(hasReplies).map((comment: CommentWithExtras) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    inputRef={inputRef}
                    userId={userId}
                    post={post}
                  />
                ))}
              </>
            )}
          </ScrollArea>

          <ViewPost className="hidden border-b md:flex" />

          <div className="mt-auto hidden border-b p-2.5 px-2 md:block">
            <div className="relative flex w-full items-start gap-x-2">
              <LikeButton post={post} userId={userId} />
              <ShareButton postId={post.id} />
              <BookmarkButton post={post} userId={userId} />
            </div>
            <time className="text-[11px] font-medium uppercase text-zinc-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <CommentForm postId={id} className="hidden md:inline-flex" inputRef={inputRef} />
        </div>

        {image && (
          <div className="relative h-96 w-full max-w-3xl md:h-[500px] lg:h-[700px] xl:h-[800px]">
            <Image
              src={image}
              fill
             
              alt="Post Image"
              className="object-cover"
            />
          </div>
        )}
        <div className="w-full border-b p-2.5 md:hidden">
          <div className="relative flex w-full items-start gap-x-2">
            <LikeButton post={post} userId={userId} />
            <ShareButton postId={post.id} />
            <div className="flex w-full items-end justify-end">
              <BookmarkButton post={post} userId={userId} />
            </div>
          </div>
        </div>
        <CommentForm postId={id} className="md:hidden" inputRef={inputRef} />
        <ViewPost className="md:hidden" />
      </DialogContent>
    </Dialog>
  );
}

export default PostView;
