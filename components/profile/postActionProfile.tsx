import { cn } from "@/lib/utils";
import LikeButton from "../like";
import PostView from "../post/PostView";
import ShareButton from "../ShareButton";
import BookmarkButton from "../BookmarkButton";

type Props = {
    post: any
    userId?: string;
    className?: string;
  
  };
export const PostActionProfile = ({ userId, className,post}: Props) => {
    return ( 
        <div className={cn("relative flex items-start w-full gap-x-8 ", className)}>
      <LikeButton post={post} userId={userId} />
      <PostView post={post} id={post.id} userId={userId!}  />
    </div>
    );
}