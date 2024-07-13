"use client";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createComment } from "@/action/comment-action";
import { CreateComment } from "@/lib/Schema";

function CommentForm({
  postId,
  className,
}: {
  postId: string;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  const form = useForm<z.infer<typeof CreateComment>>({
    resolver: zodResolver(CreateComment),
    defaultValues: {
      body: "",
      postId,
    },
  });

  const body = form.watch("body");
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          await createComment(values);
          form.reset();
        })}
        className={cn(
          "border-b relative border-gray-200 dark:border-neutral-800 py-3 flex items-center space-x-2 w-full px-3",
          className
        )}
      >
        {isSubmitting && (
          <div className="absolute flex w-full items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full">
                <FormControl>
                  <input
                    disabled={isSubmitting}
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 border-none bg-transparent text-sm font-medium placeholder-neutral-400 focus:outline-none disabled:opacity-30 dark:text-neutral-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <button
          disabled={!body.trim().length || isSubmitting}
          type="submit"
          className="text-sm font-semibold text-sky-500 hover:text-sky-700 disabled:cursor-not-allowed disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:hover:text-white dark:disabled:text-slate-500 dark:disabled:hover:text-slate-500"
        >
          Post
        </button>
      </form>
    </Form>
  );
}

export default CommentForm;