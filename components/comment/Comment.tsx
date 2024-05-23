"use client";

import { CommentWithExtras } from "@/lib/definitions";
import CommentOptions from "@/components/comment/CommentOptions";
import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";
import Timestamp from "../Timestamp";
import CommentReply from "./CommentReply";
import { useState } from "react";
import LikeComment from "./LikeComment";


type Props = {
  comment: CommentWithExtras;
  inputRef?: React.RefObject<HTMLInputElement>;
  userId: string;
  post:any;
};

function Comment({ comment, inputRef , userId ,post}: Props) {
  
 
  const username = comment.user.username;
  const href = `/${username}`;
const [expand , setExpand] = useState(false)

const handleReply =()=>{
  setExpand( !expand)
}
 
  return (
    <div>
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
        <div className="flex h-7 items-start space-x-3.5">
        <LikeComment comment={comment} userId={userId}/>
       
        <div className="flex h-7 items-end space-x-3.5">
       
          <Timestamp createdAt={comment.createdAt} />
          <div >
         
          </div>
          
          <button
            className="text-xs font-semibold text-neutral-500"
            onClick={
              handleReply
            }
          >
            Reply
          </button>
          
          {comment.userId === userId && (
            <CommentOptions comment={comment} id={comment.id} />
          )}
        </div>
        </div>
      </div>
      
    </div>
    
   {expand ? <div className="ml-16 border border-red-900">
          <CommentReply comment={comment} userId={userId}  post={post} id={comment.id}/>
          </div> : null}
          
    </div>
  );
}

export default Comment;