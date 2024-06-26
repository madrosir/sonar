'use client';

import { HiPaperAirplane } from "react-icons/hi2";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import MessageInput from "./MessageInput";
import { GoPaperAirplane } from "react-icons/go";
const TextArea = ({ conversationId }: { conversationId: string }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
        setValue('message', '', { shouldValidate: true });
        await axios.post('/api/messages', {
          ...data,
          conversationId
        });
      } catch (error) {
        console.error("Failed to send message", error);
        if (error) {
          console.error("Response data:", error);
          console.error("Response status:", error);
        }
      
      }
  }

  return (
    <div className="flex w-full items-center gap-2 border-t bg-white px-4 py-4 lg:gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-center gap-2 lg:gap-4">
        <MessageInput 
          id="message" 
          register={register} 
          errors={errors} 
          required 
          placeholder="Write a message"
        />
        <button 
          type="submit" 
          className="cursor-pointer rounded-full bg-sky-500 p-2 transition hover:bg-sky-600"
          aria-label="Send message"
        >
     <GoPaperAirplane />
       </button>
      </form>
    </div>
  );
}

export default TextArea;
