"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import UserProfile from "@/lib/definitions";
import Image from "next/image";
import LikeButton from "../like";
import PostView from "../post/PostView";
import { cn } from "@/lib/utils";

type Props = {
  profile: UserProfile;
  isCurrentUser: boolean
};

export const ProfilePost = ({ profile,isCurrentUser }: Props) => {
  const [change, setChange] = useState(false);

  const filteredPosts = change
    ? profile.posts.filter((post) => post.savedBy.length > 0)
    : profile.posts;

  return (
    <div className="w-full">
      <div className="mt-5 flex justify-center">
        <Button
          className={cn("mr-3 rounded-none border-b-2 shadow-rose-200", change ? "border-gray-300" : "border-black")}
          variant="ghost"
          onClick={() => setChange(false)}
        >
          Posts
        </Button>
      { isCurrentUser  ? (<Button
          variant="ghost"
          className={cn("mr-3 rounded-none border-b-2 shadow-rose-200", change ? "border-black" : "border-gray-300")}
          onClick={() => setChange(true)}
        >
          Saved Posts
        </Button>): (null)}
      </div>
      <div className="mt-2 h-[800px] w-full overflow-auto px-4">
        <div className="grid grid-cols-3 gap-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="group relative w-full pb-[150%]">
                <div className="absolute inset-0">
                  {post.imageurl ? (
                    <Image
                      src={post.imageurl}
                      alt="Post image"
                      fill
                      style={{ width: "100%", height: "100%", objectFit: 'cover' }}
                      className="rounded-lg"
                      sizes="100"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 opacity-0 transition-opacity group-hover:opacity-50">
                    <div className="relative flex w-full items-start justify-center gap-x-2">
                      <LikeButton post={post} userId={profile.userid} />
                      <PostView post={post} id={post.id} userId={profile.userid} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : change ? (
            <div className="col-span-3 flex h-[800px] items-center justify-center text-2xl font-semibold">
              No saved posts
            </div>
          ) : (
            <div className="col-span-3 flex h-[800px] items-center justify-center text-2xl font-semibold">
              Create a post
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
