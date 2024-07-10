"use client"
import { HiChevronLeft } from 'react-icons/hi';
import Link from "next/link";
import useOtherUser from '@/hook/useOtherUser';
import Avatar from '../Avatar';
import { FullMessageType } from '@/lib/definitions';
import { useCallback,  } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { FaEllipsisH } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { DeleteChat,  } from './deleteDialog';

interface HeaderProps {
  conversation: FullMessageType;
  conversationId: string;
}

const Header = ({ conversation, conversationId }: HeaderProps) => {
  const otherUser = useOtherUser(conversation);
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
  }, [conversationId, router]);

  return (
    <div className="flex h-[80px] w-full items-center justify-between border-b-[1px] bg-[#f7fafc] px-4 shadow-sm">
      <div className="flex items-center space-x-3">
        <Link
          href="/conversations"
          className="block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden"
        >
          <HiChevronLeft size={32} aria-label="Back to conversations" />
        </Link>
        <Avatar user={otherUser?.user} />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">
            {otherUser?.user.name || 'User'}
          </div>
          <div className="text-sm text-gray-500">
           
          </div>
        </div>
      </div>
      <div className="mr-8 flex items-center space-x-2">
      <Popover>
  <PopoverTrigger ><FaEllipsisH/></PopoverTrigger>
  <PopoverContent  className='w-full'><DeleteChat conversationId={conversationId}/></PopoverContent>
</Popover>
      </div>
    </div>
  );
}

export default Header;
