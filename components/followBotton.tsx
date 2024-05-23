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
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });
  console.log(profileId)
  console.log(result);
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const id = formData.get("id") as string;
      execute({ id }); 
    }}
    className={className}>
      <input type="hidden" value={profileId} name="id" />
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
