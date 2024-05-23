"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";

import { Textarea } from "../ui/textarea";
import { MdPictureInPicture } from "react-icons/md";
import { UploadButton } from "@/utils/uploadthing";
import { createPost } from "@/action/post-action";

export const CreatePost = ({ validNotes }: any) => {
  const [expand, setExpand] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [imageUrl, setImageurl] = useState<string | null>(null)
  const { execute, result} = useAction(createPost
    , {
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error,"error");
      },
    });
 
  console.log(result);

 
  const addEvent = (e:any) => {
    e.preventDefault();
   
    setExpand(false);

   setAddImage(false);

  setImageurl(null)
  

  };
  const handleImage = () => {
    setAddImage(true);
  }

  return (
    
    <div className="mx-auto my-6 min-h-36 w-[28rem] rounded-md border border-gray-500 shadow-md shadow-gray-900">
      <form onSubmit={(e) => {e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const content = formData.get("content") as string || null;
        const imageurl = formData.get("imageurl")  as string || null ;
        execute( {
          content : content ?? undefined,
          imageurl: imageurl ?? undefined,
          
        })
        
      }}>
        <Textarea
          name="content"
          placeholder="What's on your mind?"
          onClick={() => {
            setExpand(true);
          }}
          cols={50}
  rows={4}
  className="w-full border-none bg-transparent text-base font-medium outline-none transition hover:border-none dark:text-gray-300"
  style={
    expand
      ? { height: "10rem", marginTop: "0.75rem" }
      : { height: "1.5rem", marginTop: 0 }
  }
          
              /> 
              <input  type="hidden" name="imageurl" value={imageUrl ?? ""}/>
              {expand ? (
          <div className="w-full items-center justify-between">
            <div className="flex h-[50px]">
            <UploadButton
            
      appearance={{
        container: " rounded-md transparent bg-transparent ",
        button: " rounded-md w-[60px] h-[40px] bg-[#f7f9fc]  onclick:ring-none hover:ring-none flex item-end",
        allowedContent:"sr-only"
        
      }}
      
      
      className="transparent h-[50px]"
      content={{
        
        button:( <div   onClick={handleImage} >
        <MdPictureInPicture  className="text-2xl text-black"/>
      </div>)
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
             <div className="mt-1 flex w-full justify-end">
            <button
              onClick={addEvent}
              className="px-8 font-medium dark:text-gray-300"
            >
              Close
            </button>
            <button type="submit">Create Post</button>
            </div> 
            </div>

            <div className="w-full border border-red-300">
      {imageUrl ?( <Image 
       src={imageUrl}
       alt="image"
       width={600}
       height={900}
       /> ): null }
       </div>
          </div>
        ) : null}
        <div className="flex border border-emerald-300">
       
      </div>
   
      </form>
      
    </div>
   
  );
};
