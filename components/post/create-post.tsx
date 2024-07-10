"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { Textarea } from "../ui/textarea";
import { MdPictureInPicture } from "react-icons/md";
import { UploadButton } from "@/utils/uploadthing";
import { createPost } from "@/action/post-action";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export const CreatePost = ({ userImage }: { userImage: string }) => {
  const { user } = useUser();
  const userId = user?.id;
  const [expand, setExpand] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [imageUrl, setImageurl] = useState<string >("");
  const [content, setContent] = useState<string>("");

  const { execute, result } = useAction(createPost, {
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });

  console.log(result);

  const addEvent = (e: any) => {
    e.preventDefault();
    setExpand(false);
    setAddImage(false);
    setImageurl("");
    setContent(""); 
  };

  const handleImage = () => {
    setAddImage(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error("Image is required!");
      return;
    }
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const content = (formData.get("content") as string) || null;
    execute({
      content: content ?? undefined,
      imageurl: imageUrl ?? undefined,
      userId: userId,
    });
  };

  return (
    <div className={`mx-auto min-h-36 ${expand ? "w-[27rem]" : "w-[27rem]"} rounded-md border border-gray-300 shadow-md shadow-gray-100 transition-all duration-300`}>
      <form onSubmit={handleSubmit}>
        <div className="relative p-4">
          <Image
            src={userImage}
            alt="User"
            width={40}
            height={40}
            className="absolute left-0 top-0 ml-3 mt-7 rounded-full"
          />
          <div className="ml-14">
            <Textarea
              name="content"
              placeholder="What are you thinking?"
              onClick={() => {
                setExpand(true);
              }}
              cols={50}
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-14 w-full resize-none border bg-transparent text-base font-medium outline-none transition hover:border-none dark:text-gray-900"
              style={
                expand
                  ? { height: "5rem", marginTop: "0.75rem" }
                  : { height: "1.5rem", marginTop: 0 }
              }
            />
          </div>
          {imageUrl && (
            <div className="mt-4 flex w-full justify-center">
              <Image
                src={imageUrl}
                alt="Uploaded"
                width={350}
                height={100}
                className="rounded-md object-cover"
              />
            </div>
          )}
          <input type="hidden" name="imageurl" value={imageUrl ?? ""} />
          {expand && (
            <div className="mt-4 flex w-full items-center">
              <div className="flex h-[50px] w-full items-center justify-between">
                <UploadButton
                  appearance={{
                    container: "rounded-md transparent bg-transparent",
                    button:
                      "rounded-md w-[60px] h-[40px] bg-[#f7f9fc] onclick:ring-none hover:ring-none flex item-end",
                    allowedContent: "sr-only",
                  }}
                  className="transparent h-[50px]"
                  content={{
                    button: (
                      <div onClick={handleImage}>
                        <MdPictureInPicture className="text-2xl text-black" />
                      </div>
                    ),
                  }}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImageurl(res?.[0].url);
                    console.log("Files: ", res);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                <div className="ml-auto flex items-center">
                  <button
                    onClick={addEvent}
                    className="px-4 font-medium text-gray-600"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="ml-2 rounded-md bg-blue-500 px-4 py-2 font-medium text-white"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
      
    </div>
  );
};
