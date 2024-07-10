
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
 
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

interface props{
  conversationId: string;
}

export function DeleteChat({conversationId}:props) {
    const router = useRouter();

  
  
    const onDelete = useCallback(() => {
      axios.delete(`/api/conversations/${conversationId}`)
        .then((response) => {
          if (response.data?.success) {
            toast.success('Conversation deleted successfully');
            router.push('/chat');
          } else {
            toast.error('Failed to delete conversation');
          }
        })
        .catch((error) => {
          console.error('Delete conversation error:', error);
          toast.error('Something went wrong!');
        });
    }, [conversationId, router])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete Chat</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
      Are you sure you want to delete the conversation?
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
