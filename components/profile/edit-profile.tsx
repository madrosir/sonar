"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
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
  const [imageUrl, setImageurl] = useState<string>(validNotes.imageUrl);

  const { execute } = useAction(changeName, {
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });

  const handleDelete = () => {
    setImageurl(validNotes.imageUrl);
  };

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      username: validNotes.username,
      name: validNotes.name,
      bio: validNotes.bio,
      email: validNotes.email,
      imageUrl: validNotes.imageUrl,
    },
  });

  function onSubmit(values: z.infer<typeof updateSchema>) {
    execute({
      username: values.username,
      name: values.name,
      bio: values.bio,
      email: values.email,
      imageUrl: imageUrl,
    });
  }

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rounded-lg bg-white p-10 shadow-lg">
          <p className="mb-6 text-2xl font-semibold">Account Information</p>
          <div className="mb-6 flex items-center">
            <Image
              src={imageUrl}
              alt="profile Image"
              width={190}
              height={200}
              className="rounded-xl shadow-lg"
            />
            <div className="ml-6">
              <p className="ml-5 mt-4 text-lg font-bold text-gray-600">Profile Picture</p>
              <div className="ml-5 mt-14 flex space-x-4">
                <UploadButton
                  appearance={{
                    container: "rounded-md bg-transparent",
                    button: "rounded-xl w-full h-12 bg-blue-400 text-white px-5",
                  }}
                  className="mb-4"
                  content={{
                    button: <div>Replace</div>,
                  }}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImageurl(res?.[0].url);
                    toast.success("Uploaded");
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                <Button
                  className="flex h-12 w-full items-center justify-center bg-red-600 text-white hover:bg-red-700"
                  onClick={handleDelete}
                  type="button"
                >
                  <HiOutlineTrash className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <p className="mb-6 text-2xl font-semibold text-gray-600">Basic Information</p>
          <div className="mb-6 grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="py-2 text-lg"
                    />
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
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      className="py-2 text-lg"
                    />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} className="py-2 text-lg" />
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
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your bio" {...field} className="py-2 text-lg" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-blue-600 py-3 text-white hover:bg-blue-700">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
