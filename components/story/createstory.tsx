"use client"
import { createStory } from "@/action/story-action";
import {
    Dialog,
    DialogContent,
 
    DialogTrigger,
  } from "@/components/ui/dialog"
import { UploadDropzone } from "@/utils/uploadthing";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const CreateStory = ({user}:{ user:any}) => {
  const [imageUrl, setImageurl] = useState<string>()
  const [addImage, setAddImage] = useState(false);
  const { execute, result} = useAction(createStory
    , {
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error,"error");
      },
    });
 
  console.log(result);
 
 
  const handleImage = () => {
    setAddImage(true);
  }
    return ( <Dialog>
        <DialogTrigger>
          <div>
          <div className="rounded-full bg-gradient-to-tr from-yellow-500 to-red-600 p-[2px]">
          <div className="rounded-full bg-white p-1">
            <Image
           src={user.imageUrl!}
            alt="user image"
            height="55"
            width="55"
          
            className="rounded-full"
            />
            
            </div>
            
            </div>
            <p className="w-16 truncate text-center text-xs">Your Story</p>
            </div>
        </DialogTrigger>
        <DialogContent>
        <form onSubmit={(e) => {e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const imageUrl = formData.get("imageUrl")  as string  ;
        execute( {
          
          url: imageUrl,
          durations:5000,
          type: "image"
         
        })
        
      }}>
        <input  type="hidden" name="imageUrl" value={imageUrl}/>
               <UploadDropzone
            
           
            
            
            className="ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
            content={{
              
            
            }}
            
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageurl(res?.[0].url);
              console.log("Files: ", res);
              toast.success("Uploaded complete.");
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          <Button type="submit">daw</Button>
        </form>
        </DialogContent>
      </Dialog> );
}
 
export default CreateStory;