
import { PostDelete } from "@/action/post-action";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
 
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from "@clerk/nextjs";
import { useAction } from "next-safe-action/hooks";


interface prop{
    postId:string
}

export function DeletePost({postId}:prop
) {
    const {user} = useUser()
    const userId = user?.id
    const { execute, result } = useAction(PostDelete, {
        onSuccess: () => {
          console.log("success");
        },
        onError: (error) => {
          console.log(error, "error");
        },
      });
      const onDelete = () => {
        execute({
            id:postId,
            userId:userId!
        })
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
      <div className="w-full border-b"> <button  className="my-2 w-full text-sm">Delete Post</button></div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
      Are you sure you want to delete the Post?
      <div className="ml-10 flex justify-end">
        <Button onClick={onDelete} variant='destructive' className="mr-5">Yas</Button>
       
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              No
            </Button>
          </DialogClose>
          </div>
      </DialogContent>
    </Dialog>
  )
}
