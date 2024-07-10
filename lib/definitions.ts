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
  
  export type UserWithExtras = User & {
    posts: Post[]&{comment: Comment[] ,like:Like[], savedBy:SavedPost[]};
    saved: SavedPost[];
    followedBy: FollowerWithExtras[];
    following: FollowingWithExtras[];
  };

  export type StoryWithUser = 
  ({ stories: { id: string; createdAt: Date; url: string; userId: string; type: string; duration: number; }[]; } & { id: string; userid: string; name: string | null; username: string | null; imageUrl: string | null; email: string | null; bio: string | null; })
 
export type followingUser = {
  followerId: string;
  followingId: string;
  following: {
      username: string | null;
      id: string;
      userid: string;
      imageUrl: string | null;
      messages: {
          id: string;
          content: string
          createdAt: Date;
          seenMessages: {
            messageId: string;
            userId: string;
        }[];
      }[];
  };
}[]
export type Story2=  { id: string; createdAt: Date; url: string; userId: string; type: string; duration: number; }[]


export type usersWithStories= {
  followerId: string;
  followingId: string;
  following: {
      username: string | null;
      imageUrl: string | null;
  };
}[]
export type allStories= ({
  stories: {
      id: string;
      createdAt: Date;
      url: string;
      userId: string;
      type: string;
      duration: number;
  }[];
} & {
  id: string;
  userid: string;
  name: string | null;
  username: string | null;
  imageUrl: string | null;
  email: string | null;
  bio: string | null;
})[]

export type chats = ({ seenMessages: { messageId: string; userId: string; }[]; } & 
  { id: string; content: string ; image: string | null; createdAt: Date; conversationId: string; senderId: string; })[]


  export type Receiver ={
    id: string;
    userid: string;
    name: string | null;
    username: string | null;
    imageUrl: string | null;
    email: string | null;
    bio: string | null;
  }
  export type lastMessage= ({
    seenMessages: {
        messageId: string;
        userId: string;
    }[];
} & {
    id: string;
    content: string | null;
    image: string | null;
    createdAt: Date;
    conversationId: string;
    senderId: string;
})[]
export type fetchFollowingAndConversations =  ({
  following: {
      id: string;
      userid: string;
      username: string | null;
      imageUrl: string | null;
      messages: {
          id: string;
          createdAt: Date;
          content: string | null;
      }[];
  };
  followerId: string;
  followingId: string;
}[] | {
  conversationId: string;
    userId: string;
}[])[]
export type fuck = {
  username: string | null;
  id: string;
  userid: string;
  imageUrl: string | null;
  messages: {
      id: string;
      content: string;
      createdAt: Date;
      seenMessages: {
          messageId: string;
          userId: string;
      }[];
  }[];
}
export  type FollowingUser = {
  followerId: string;
  followingId: string;
  following: {
      username: string | null;
      id: string;
      userid: string;
      imageUrl: string | null;
      messages: {
          id: string;
          content: string;
          createdAt: Date;
          seenMessages: {
            messageId: string;
            userId: string;
          }[];
      }[];
  };
}
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

export type typeHeader= {
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
    }[];
  }[];
};
type UserProfile = {
  id: string;
  userid: string;
  name?: string;
  username?: string;
  imageUrl?: string;
  email?: string;
  bio?: string;
  posts: {
    id: string;
    content?: string;
    imageurl?: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: {
      id: string;
      userid: string;
      name?: string;
      username?: string;
      imageUrl?: string;
      email?: string;
      bio?: string;
    };
    likes: {
      id: string;
      postId?: string;
      userId: string;
      commentId?: string;
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
      parentId?: string;
      user: {
        id: string;
        userid: string;
        name?: string;
        username?: string;
        imageUrl?: string;
        email?: string;
        bio?: string;
      };
      replies?: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        body: string;
        postId: string;
        userId: string;
        parentId?: string;
        likes: {
          id: string;
          postId?: string;
          userId: string;
          commentId?: string;
        }[];
      }[];
      likes: {
        id: string;
        postId?: string;
        userId: string;
        commentId?: string;
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
    role: string;
    follower: {
      id: string;
      userid: string;
      username?: string;
      imageUrl?: string;
      following: {
        followerId: string;
        followingId: string;
      }[];
      followedBy: {
        followerId: string;
        followingId: string;
      }[];
    };
  }[];
  following: {
    followerId: string;
    followingId: string;
    role: string;
    following: {
      id: string;
      userid: string;
      username?: string;
      imageUrl?: string;
      following: {
        followerId: string;
        followingId: string;
      }[];
      followedBy: {
        followerId: string;
        followingId: string;
      }[];
    };
  }[];
};

export default UserProfile;

export type PostType = {
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
    User: {
      id: string;
      userid: string;
      name: string | null;
      username: string | null;
      imageUrl: string | null;
      email: string | null;
      bio: string | null;
    };
    Post: {
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
      likes: any[];
      savedBy: any[];
      comments: any[];
    } | null;
    Comment: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      body: string;
      postId: string;
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
      parentId: string | null;
      parent: any | null;
      replies: any[];
      likes: any[];
    } | null;
  }[];
  savedBy: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    postId: string;
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
  comments: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    body: string;
    postId: string;
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
    parentId: string | null;
    parent: any | null;
    replies: any[];
    likes: {
      id: string;
      postId: string | null;
      userId: string;
      commentId: string | null;
      User: {
        id: string;
        userid: string;
        name: string | null;
        username: string | null;
        imageUrl: string | null;
        email: string | null;
        bio: string | null;
      };
      Post: any | null;
      Comment: any | null;
    }[];
  }[];
};
