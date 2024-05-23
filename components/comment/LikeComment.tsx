"use client"

import { CommentWithExtras} from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Like } from "@prisma/client";
import { Heart } from "lucide-react";
import {  useOptimistic, useTransition } from "react";
import ActionIcon from "../ActionIcon";
import { likeComment } from "@/action/comment-action";


function LikeComment({
    comment,
  userId,
 
}: {
  
    comment: CommentWithExtras;
  userId?: string;
}) {
    
  const predicate = (like: Like) =>
    like.userId === userId && like.commentId === comment.id;
  
  let [isPending, startTransition] = useTransition();

  const [optimisticLikes, addOptimisticLike] = useOptimistic<Like[]>(
    comment.likes ,
    
    // @ts-ignore
    (state: Like[], newLike: Like) =>
      state.some(predicate)
        ? state.filter((like) => like.userId !== userId)
        : [...state, newLike]
  );

  
  return (
    <div className="flex flex-col">
      <form
        action={async (formData: FormData) => {
          const commentId = formData.get("commentId");
          
          startTransition(() => {
          addOptimisticLike({ commentId, userId });
          })
          await likeComment({commentId: comment.id});
        
        }}
      >
        <input type="hidden" name="commentId" value={comment.id} />

        <ActionIcon>
          <Heart
            className={cn("h-5 w-5", {
              "text-red-500 fill-red-500": optimisticLikes.some(predicate),
            })}
          />
        </ActionIcon>
      </form>
     
    </div>
  );
}

export default LikeComment;