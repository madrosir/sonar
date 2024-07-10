"use client"
import { Story } from '@prisma/client';
import Image from 'next/image';
import Stories from 'react-insta-stories';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

type Props = {
    story:Story[]
    image:string
    username:string
}
export const UserStory = ({story,image,username}: Props) => {
    const stories = story.map((story) =>{
        return {
          url: story.url,
          type: story.type,
          duration: story.duration,
          header: {
            heading: username,
            subheading: story.createdAt.toUTCString(),
            profileImage: image,
          },
        }
      })
    return ( 
        <Dialog>
        <DialogTrigger>
          <div>
          <div className="rounded-full bg-gradient-to-tr from-yellow-500 to-red-600 p-[2px]">
          <div className="rounded-full bg-white p-1">
            <Image
           src={image}
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
        <DialogContent className='flex w-[600px] items-center justify-center border-0 p-0'>
          
            
        <Stories
                 loop
                 stories={stories}
                 defaultInterval={1500}
                 width={524}
                 height={755}
                 storyStyles={{ objectFit: "contain" }}
               
              />
       
        </DialogContent>
      </Dialog>
    );
}