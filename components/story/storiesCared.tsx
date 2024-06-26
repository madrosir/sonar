"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState} from "react";
import { StoryWithUser } from "@/lib/definitions";
import Stories from 'react-insta-stories';
import { story } from "@/lib/Schema";

export default function CarouselDemo({
  currentUserIndex,
  allStories,
}: {
  currentUserIndex: number;
  allStories: StoryWithUser[];
}) {
  const [userIndex, setUserIndex] = useState(currentUserIndex);

  useEffect(() => {
    setUserIndex(currentUserIndex); // Sync with external currentUserIndex
  }, [currentUserIndex]);

  const selectedUser = allStories[userIndex];
  const selectedUserStories = selectedUser ? selectedUser.stories : [];
 const heading = selectedUser.username!



  const stories = selectedUserStories.map((story) =>{
    return {
      url: story.url,
      type: story.type,
      duration: story.duration,
      header: {
        heading: heading,
        subheading: story.createdAt.toUTCString(),
        profileImage: selectedUser.imageUrl!,
      },
    }
  })
  const handleNextUser = () => {
    if (userIndex < allStories.length - 1) {
      setUserIndex(userIndex + 1);
    }
  };

  const handlePreviousUser = () => {
    if (userIndex > 0) {
      setUserIndex(userIndex - 1);
    }
  };

  return (
    <Carousel className="w-[600px] items-center justify-center">
      <CarouselContent>
        {selectedUserStories.map((story) => (
          <CarouselItem key={story.id} className="flex items-center justify-center">
            <div>
              <Stories
                loop
                stories={stories}
                defaultInterval={1500}
                width={524}
                height={755}
                storyStyles={{ objectFit: "contain" }}
                onAllStoriesEnd={handleNextUser}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious onClick={handlePreviousUser} disabled={userIndex <= 0} />
      <CarouselNext onClick={handleNextUser} disabled={userIndex >= allStories.length - 1} />
    </Carousel>
  );
}
