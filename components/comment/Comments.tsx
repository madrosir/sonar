"use client"

import { CreateComment } from '@/lib/Schema';
import { CommentWithExtras} from '@/lib/definitions'
import { zodResolver } from '@hookform/resolvers/zod';
import { Comment, User } from '@prisma/client';
import Link from 'next/link';
import React, { useOptimistic, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { z } from "zod";
import {   createComment } from '@/action/comment-action';

import { Input } from '../ui/input';


function Comments({
  postId,
  comments,
  user,

}: {
  postId: string;
  comments: CommentWithExtras[];
  user?: User | null;
 
}) {
  
  const hasReplies = (comment:CommentWithExtras) => !comment.parentId 
  const form = useForm<z.infer<typeof CreateComment>>({
    resolver: zodResolver(CreateComment),
    defaultValues: {
      body: "",
      postId,
    },
  });
  let [isPending, startTransition] = useTransition();
  const [optimisticComments, addOptimisticComment] = useOptimistic<
    CommentWithExtras[]
  >(
    comments,
    // @ts-ignore
    (state: Comment[], newComment: string) => [
      { body: newComment, userId: user?.id, postId, user },
      ...state,
    ]
  );
  const body = form.watch("body");
  const commentsCount = optimisticComments.filter(hasReplies).length;
 
 
  return (
    <div className="space-y-0.5 px-3 sm:px-0">
      {commentsCount > 1 && (
        <Link
          scroll={false}
          href={`/p/${postId}`}
          className="text-sm font-medium text-neutral-500"
        >
          View all {commentsCount} comments
        </Link>
      )}
 
      {optimisticComments.filter(hasReplies).slice(0, 3).map((comment, id) => {
        const username = comment.user?.username;



        return (
          <div
            key={id}
            className="flex items-center space-x-2 text-sm font-medium"
          >
            <Link href={`/${username}`} className="font-semibold">
              {username}
            </Link>
            <div className='flex w-full justify-between' >
            <p >{comment.body }</p>
         
            </div>
            
          </div>
        );
      })}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            const valuesCopy = { ...values };
            form.reset();
            startTransition(() => {
              addOptimisticComment(valuesCopy.body);
            });

            await createComment( valuesCopy);
          })}
          className="flex items-center space-x-2 border-b border-gray-300 py-1 pb-3 dark:border-neutral-800"
        >
          <FormField
            control={form.control}
            name="body"
            render={({ field, fieldState }) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <Input
                   
                    placeholder="Add a comment..."
                    className="flex-1 border-none bg-transparent text-sm font-medium placeholder-neutral-500 focus:outline-none dark:text-white dark:placeholder-neutral-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {body.trim().length > 0 && (
            <button
              type="submit"
              className="text-sm font-semibold text-sky-500 hover:text-white disabled:cursor-not-allowed disabled:hover:text-sky-500"
            >
              Post
            </button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default Comments;