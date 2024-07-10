"use client";

import { PostEdit } from "@/action/post-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadButton } from "@/utils/uploadthing";
import { useUser } from "@clerk/nextjs";
import { Post } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

interface Prop {
  post: Post;
}

export function EditPost({ post }: Prop) {
  const [imageurl, setImageUrl] = useState<string>(post.imageurl!);
  const [content, setContent] = useState<string>(post.content || "");
  const { user } = useUser();
  const userId = user?.id;
  const { execute } = useAction(PostEdit, {
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });



 

  const handleDelete = () => {
    setImageUrl(post.imageurl!);
  };
  console.log(imageurl)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full border-b">
          <button className="my-2 w-full text-sm">Edit Post</button>
        </div>
      </DialogTrigger>
      <DialogContent className="rounded-lg bg-slate-100 p-6 shadow-lg">
        <form 
         onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const content = (formData.get("content") as string) || null;
          execute({
            content: content ?? undefined,
            imageurl: imageurl,
            userId:userId,
            id:post.id
          });
        }}>
          <div className="flex w-full flex-col items-center">
            {imageurl && (
              <Image
                src={imageurl}
                alt="profile Image"
                width={590}
                height={500}
                className="mb-4 rounded-md"
              />
            )}
            <div className="flex space-x-4">
              <UploadButton
                appearance={{
                  container: "rounded-md bg-transparent",
                  button: "rounded-xl w-full h-12 bg-blue-400 text-white px-5",
                }}
                content={{
                  button: <div>Replace Image</div>,
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImageUrl(res?.[0].url);
                  toast.success("Uploaded");
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
              <Button
                className="flex h-12 w-full items-center justify-center bg-red-600 text-white hover:bg-red-700"
                type="button"
                onClick={handleDelete}
              >
                <HiOutlineTrash className="mr-2" />
                Delete
              </Button>
            </div>
          </div>

          <div className="my-4">
           <Textarea
         
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
          </div>
<DialogClose asChild className="w-full">
          <Button
            type="submit"
            className="w-full bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            Submit
          </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
