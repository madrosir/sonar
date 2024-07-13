import type {
    Comment,
    Follows,
    Like,
    Post,
    SavedPost,
    User,
  } from "@prisma/client";
  
  export type CommentWithExtras = Comment & { user: User ;likes: LikeWithExtras};
  export type LikeWithExtras = Like & { user: User };
  
  export type PostWithExtras = Post & {
    comments: CommentWithExtras[];
    likes: LikeWithExtras[];
    savedBy: SavedPost[];
    user: User;
  };

  export type UserWithFollows = User & {
    following: Follows[];
    followedBy: Follows[];
  };
  
  export type FollowerWithExtras = Follows & { follower: UserWithFollows };
  export type FollowingWithExtras = Follows & { following: UserWithFollows };
  
 

  export type StoryWithUser = 
  ({ stories: { id: string; createdAt: Date; url: string; userId: string; type: string; duration: number; }[]; } & { id: string; userid: string; name: string | null; username: string | null; imageUrl: string | null; email: string | null; bio: string | null; })
 
export  type  messages = {
  id: string;
  content: string;
  createdAt: Date;
  seenMessages: {
      messageId: string;
      userId: string;
  }[];
}[]
export type FullMessageType = {
  id: string;
  createdAt: Date;
  lastMessageAt: Date;
  users: {
    conversationId: string;
    userId: string;
    user: {
      id: string;
      userid: string;
      name: string | null;
      username: string | null;
      imageUrl: string | null;
      email: string | null;
      bio: string | null;
    };
  }[];
  messages: {
    id: string;
    content: string;
    image: string | null;
    createdAt: Date;
    conversationId: string;
    senderId: string;
    sender: {
      id: string;
      userid: string;
      name: string | null;
      username: string | null;
      imageUrl: string | null;
      email: string | null;
      bio: string | null;
    };
    seenMessages: {
      messageId: string;
      userId: string;
      user: {
        id: string;
        userid: string;
        name: string | null;
        username: string | null;
        imageUrl: string | null;
        email: string | null;
        bio: string | null;
      };
    }[];
  }[];
};


export type MessageType = {
  id: string;
  content: string;
  image: string | null;
  createdAt: Date;
  conversationId: string;
  senderId: string;
  sender: {
    id: string;
    userid: string;
    name: string | null;
    username: string | null;
    imageUrl: string | null;
    email: string | null;
    bio: string | null;
  };
  seenMessages: {
    messageId: string;
    userId: string;
  }[];
};


export type UserProfile = {
  id: string;
  userid: string;
  name: string | null;
  username: string | null;
  imageUrl: string | null;
  email: string | null;
  bio: string | null;
  posts: {
    id: string;
    content: string | null;
    imageurl: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: {
      id: string;
      userid: string;
      name: string | null;
      username: string | null;
      imageUrl: string | null;
      email: string | null;
      bio: string | null;
    };
    likes: {
      id: string;
      postId: string | null;
      userId: string;
      commentId: string | null;
    }[];
    savedBy: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      postId: string;
      userId: string;
    }[];
    comments: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      body: string;
      postId: string;
      userId: string;
      parentId: string | null;
      user: {
        id: string;
        userid: string;
        name: string | null;
        username: string | null;
        imageUrl: string | null;
        email: string | null;
        bio: string | null;
      };
      replies: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        body: string;
        postId: string;
        userId: string;
        parentId: string | null;
        likes: {
          id: string;
          postId: string | null;
          userId: string;
          commentId: string | null;
        }[];
      }[];
      likes: {
        id: string;
        postId: string | null;
        userId: string;
        commentId: string | null;
      }[];
    }[];
  }[];
  saved: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    postId: string;
    userId: string;
  }[];
  followedBy: {
    followerId: string;
    followingId: string;
    role: 'FRIEND' | 'CLOSE_FRIEND';
    follower: {
      id: string;
      userid: string;
      username: string | null;
      imageUrl: string | null;
      following: {
        followerId: string;
        followingId: string;
        role: 'FRIEND' | 'CLOSE_FRIEND';
      }[];
      followedBy: {
        followerId: string;
        followingId: string;
        role: 'FRIEND' | 'CLOSE_FRIEND';
      }[];
    };
  }[];
  following: {
    followerId: string;
    followingId: string;
    role: 'FRIEND' | 'CLOSE_FRIEND';
    following: {
      id: string;
      userid: string;
      username: string | null;
      imageUrl: string | null;
      following: {
        followerId: string;
        followingId: string;
        role: 'FRIEND' | 'CLOSE_FRIEND';
      }[];
      followedBy: {
        followerId: string;
        followingId: string;
        role: 'FRIEND' | 'CLOSE_FRIEND';
      }[];
    };
  }[];
};

