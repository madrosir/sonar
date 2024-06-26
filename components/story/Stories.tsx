"use client";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { StoryWithUser } from "@/lib/definitions";
import CarouselDemo from "./storiesCared";
import { useState } from "react";

interface UserProps {
  img: string;
  username: {
    username: string | null;
    imageUrl: string | null;
  };
  fetchStories: StoryWithUser[];
  currenUserIndex: number;
}

const CardStory = ({ img, username, fetchStories,currenUserIndex }: UserProps) => {
  const [CurrentUserIndex, setCurrentUserIndex] =useState(0)
  
  return (
    <div>
      <div className="ml-3 rounded-full bg-gradient-to-tr from-yellow-500 to-red-600 p-[2px]">
        <div className="rounded-full bg-white p-1">
          <Dialog>
            <DialogTrigger asChild>
              <div  onClick={() => setCurrentUserIndex(currenUserIndex)}>
            <Image
                src={img}
                alt={username.username!}
                width={55}
                height={55}
                className="rounded-full"
               
              />
             </div>
            </DialogTrigger>
            <DialogContent className="flex items-center justify-center border-0 p-0">
              
              <CarouselDemo currentUserIndex={currenUserIndex} allStories={fetchStories} />
              
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <p className="w-16 truncate text-center text-xs">{username.username}</p>
    </div>
  );
};

export default CardStory;