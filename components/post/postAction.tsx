import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";

import ShareButton from "../ShareButton";
import BookmarkButton from "../BookmarkButton";
import LikeButton from "../like";
import PostView from "./PostView";

type Props = {
  post: any
  userId?: string;
  className?: string;

};

 function  PostActions ({ userId, className,post  }: Props) {
 
  return (
    <div className={cn("relative flex items-start w-full gap-x-2", className)}>
      <LikeButton post={post} userId={userId} />
      <PostView post={post} id={post.id} userId={userId!}  />
      <ShareButton postId={post.id} />
      <BookmarkButton post={post} userId={userId}/>
    </div>
  );
}

export default PostActions;