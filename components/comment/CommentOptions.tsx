"use client"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Comment } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

import { CommentDelete } from "@/action/comment-action";
import { useRouter } from "next/navigation";


type Props = {
  comment: Comment;
  id: string;
};

function CommentOptions({id, comment }: Props) {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    await CommentDelete({id })
   
  };




  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className="hidden h-5 w-5 cursor-pointer group-hover:inline dark:text-neutral-400" />
      </DialogTrigger>
      <DialogContent className="dialogContent">
        <form
   onSubmit={handleSubmit}
        
        >
          <input type="hidden" name="id" value={comment.id} />
          
          <Button className="w-full p-3 font-bold text-red-500 disabled:cursor-not-allowed" type="submit">
            Delete
          </Button>
        </form>

        <DialogClose className="postOption w-full border-0 p-3">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default CommentOptions;