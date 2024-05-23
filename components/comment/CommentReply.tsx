"use client"
import { CommentWithExtras, PostWithExtras } from "@/lib/definitions";
import ReplayToComment from "./replayToComment"

import Comment from "./Comment";
import { useRef } from "react";
import CommentOptions from "./CommentOptions";
import Timestamp from "../Timestamp";
import Link from "next/link";
import UserAvatar from "../UserAvatar";

function CommentReply({
    userId,
    post,
 comment,
 id
 
}: {
    id:string
    comment: CommentWithExtras;
    userId: string;
    post:PostWithExtras
}) {
    const username = comment.user.username;
  const href = `/${username}`;
  const hasReplies = (comment:CommentWithExtras) =>  comment.parentId !== null && id === comment.parentId

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border border-green-600">
       
        
                {post.comments.filter(hasReplies).map((comment:any) => {
                  return (
                    <div key={comment.id}>
                    <div className="group flex items-start space-x-2.5 p-3 px-3.5">
                      <Link href={href}>
                        <UserAvatar user={comment.user} />
                      </Link>
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-1.5 text-sm leading-none">
                          <Link href={href} className="font-semibold">
                            {username}
                          </Link>
                          <p className="border border-red-600 font-medium">{comment.body}</p>
                        </div>
                        <div className="flex h-5 items-center space-x-2.5">
                          <Timestamp createdAt={comment.createdAt} />
                          <div >
                         
                          </div>
                          
                          
                          {comment.userId === userId && (
                            <CommentOptions comment={comment} id={comment.id} />
                          )}
                        </div>
                        
                      </div>
                      
                    </div>
                    
                    </div>
                  );
                })}
          
         
        <ReplayToComment parentId={comment.id}  postId={comment.postId}/>
    </div>
  )
}

export default CommentReply
