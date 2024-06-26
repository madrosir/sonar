import { useMemo } from "react";
import { FullMessageType } from "@/lib/definitions";
import { useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";

const useOtherUser = (conversation: FullMessageType ) => {
  const { user } = useUser();

  const otherUser = useMemo(() => {
    if (!user) return null;

    const currentUserId = user.id;

    const otherUser = conversation.users.filter((conversationUser) => conversationUser.userId !== currentUserId);

    return otherUser[0] || null;
  }, [user, conversation.users]);

  return otherUser;
};

export default useOtherUser;
