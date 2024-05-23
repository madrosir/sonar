import { comment } from "postcss";
import { z } from "zod";

export const PostSchema = z.object({
  id:z.string(),
  content: z.optional(z.string().min(3).max(100)),
  imageurl:  z.optional(z.string().min(3).max(100)),
  
});

export const CreatePost = PostSchema.omit({ id: true });
export const UpdatePost = PostSchema;
export const DeletePost = PostSchema.pick({ id: true });

export const updateSchema = z.object({
  
  username: z.optional(z.string()),
   name: z.optional(z.string()),
   imageUrl: z.optional(z.string()),
   bio: z.optional(z.string()),
  email: z.optional(z.string()),
  });
  export const LikeSchema = z.object({
    postId: z.string(),
    
    
  });
  export const LikeCommentSchema = z.object({
    commentId: z.string(),
    
    
  });
  export const BookmarkSchema = z.object({
    postId: z.string(),
  });
  export const CommentSchema = z.object({
    id: z.optional(z.string()),
    body: z.string(),
    postId: z.string(),
    parentId:z.optional(z.string())
  });
  
  export const CreateComment = CommentSchema.omit({ id: true });
  export const UpdateComment = CommentSchema;
  export const deleteComment = CommentSchema.pick({ id: true });
  export const FollowUser =z.object({id: z.string()})


  const story = z.object({
    id: z.string(),
    imageUrl: z.string(),
    videoUrl: z.string(),
    
  });
  export const CreateStory = story.omit({ id: true });
export const UpdateStory = story;
export const DeleteStory = story.pick({ id: true });