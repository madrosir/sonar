"use client"
import { followUser } from "@/action/followUser-action";
import SubmitButton from "./SubmitButton";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";

function FollowButton({
  profileId,
  isFollowing,
  className,
  buttonClassName,
}: {
  profileId: string;
  isFollowing?: boolean;
  className?: string;
  buttonClassName?: string;
}) {
  const { execute, result } = useAction(followUser, {
    onSuccess: () => {
      console.log("success");
      console.log(result)
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });

 
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const userId = formData.get("userId") as string;
      execute({ userId ,role:"FRIEND"}); 
    }}
    className={className}>
      <input type="hidden" value={profileId} name="userId" />
      <SubmitButton
        className={buttonVariants({
          variant: isFollowing ? "secondary" : "default",
          className: cn("!font-bold w-full", buttonClassName),
          size: "sm",
        })}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </SubmitButton>
    </form>
  );
}

export default FollowButton;
