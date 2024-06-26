"use client"


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { useAction } from "next-safe-action/hooks";
import { updateSchema } from "@/lib/Schema";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import { toast } from "sonner";
import { HiOutlineTrash } from "react-icons/hi2";
import { changeName } from "@/action/update-user";


export const EditProfile = ({ validNotes }: any) => {
  const [imageUrl, setImageurl] = useState<string>(validNotes.imageUrl)

  const {  execute } = useAction(changeName, {
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error,"error");
    },
  });
   
  const handleDelete =() =>{
    setImageurl(validNotes.imageUrl);
  }
  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      username: validNotes.username,
      name: validNotes.name,
      bio: validNotes.bio,
      email: validNotes.email,
      imageUrl: validNotes.imageUrl
    },
  });

  function onSubmit(values: z.infer<typeof updateSchema>) {
    execute({ username: values.username
       ,name: values.name,
      bio: values.bio
       , email: values.email,
        imageUrl:imageUrl });
   
  };

  return (
    <div className="flex h-screen w-full justify-center">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     
      <p className="mt-10 justify-start text-2xl font-semibold">Account Information</p>
        <div className="mt-10 flex items-center">
        <Image src={imageUrl} alt="profile Image" width={190} height={200} className="rounded-4xl h-[190px] shadow-2xl"/>
        <div className="relative ml-6 text-lg font-bold text-muted-foreground">Profile Picture 
        <UploadButton
            
            appearance={{
              container: " rounded-md transparent bg-transparent ",
              button: " rounded-4xl w-[200px] h-[60px] bg-[#79d0f1]  px-5  flex item-end mt-12 relative ml-5  ",
              allowedContent:"sr-only ring-none"
              
            }}
            
            
            className="transparent"
            content={{
              
              button:( 
              <div className="" > replace </div>
            )
            }}
            
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageurl(res?.[0].url);
              console.log("Files: ", res);
              toast.success("Uploaded")
            }}
            
           
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          </div>
          <Button className="item-end ml-10 mt-20 flex h-[60px] w-[200px] rounded-xl border-4 bg-[#f7f7f7] text-lg text-red-700 hover:bg-white" onClick={handleDelete} type='button' > <HiOutlineTrash  className="mr-2"/>
Delete </Button>

          </div>
          <p className="text-2xl font-semibold text-muted-foreground">Basic Information</p>
          <div className="item-center flex">
        <FormField 
          control={form.control}
          name="name"
          
          
          render={({ field }) => (
            <FormItem>
              <FormLabel >name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} className="py-7 pr-16 text-lg" />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="username"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-10">username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} className="ml-10 py-7 pr-16 text-lg" />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
         <FormField
          control={form.control}
          name="email"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field}  />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        
         <FormField
          control={form.control}
          name="bio"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>bio</FormLabel>
              <FormControl>
                <Textarea placeholder="shadcn" {...field}  />
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  );
};
