import { z } from "zod";

export const PostSchema = z.object({
  id:z.string(),
  content: z.optional(z.string().min(3).max(100)),
  imageurl:  z.optional(z.string().min(3).max(100)),
  userId:z.string()
});

export const CreatePost = PostSchema.omit({ id: true });
export const UpdatePost = PostSchema;
export const DeletePost = PostSchema.pick({ id: true , userId:true});

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
  export const FollowUser =z.object({userId: z.string(), role: z.enum(['FRIEND','CLOSE_FRIEND'])})


  export const story = z.object({
    id: z.string(),
    url: z.string(),
    durations: z.number(),
    type: z.string(),

  });
  export const CreateStory = story.omit({ id: true });
export const UpdateStory = story;
export const DeleteStory = story.pick({ id: true });

export const ChatSchema = z.object({
  id: z.string(),
  conversationId : z.string(),
  userIds: z.array(z.string()),
 
 
});

export const CreateChat = z.object({
  userId: (z.string())
});
export const UpdateChat = ChatSchema
export const DeleteChat = ChatSchema.pick({ id: true });
export const createMessage = z.object({
  content: z.string(),
  conversationId: z.string(),
  senderId: z.string(),
  messageId:z.string(),
});
export const UpdateSeenMessage = z.object({
  messageId: z.string(), 
  
  recipientId: z.string() })

  export const seen = z.object({
    userid : z.string(),
    messageId: z.string(),})

