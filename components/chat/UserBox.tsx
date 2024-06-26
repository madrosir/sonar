"use client"
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {  User } from "@prisma/client";

import Image from "next/image";


interface UserBoxProps {
  data: User
}

const UserBox = ({ 
  data
}:UserBoxProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios.post('/api/conversations', { userId: data.userid })
    .then((data: { data: { id: any; }; }) => {
      router.push(`/chat/${data.data.id}`);
    })
    .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
     
      <div
        onClick={handleClick}
        className="relative flex w-full cursor-pointer items-center space-x-3 rounded-lg bg-white p-3 transition hover:bg-neutral-100"
      >
          <div className="my-2 flex justify-between rounded-lg p-3 transition-colors hover:bg-gray-200">
           

            
               <Image src={data.imageUrl!} alt="@shadcn" width={55} height={55} className="rounded-full" />
               <div className="flex-1 truncate">
                 <div className="pl-3 text-start font-medium">{data.username}</div>
                

<div className="text-bold pl-3 text-start text-sm">
</div>


               </div>
               <div className="justify-end text-sm text-gray-500 dark:text-gray-400">2:39 PM</div>
           
           
         </div>
        
      </div>
    </>
  );
}
 
export default UserBox;