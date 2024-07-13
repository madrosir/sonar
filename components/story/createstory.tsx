"use client"
import { createStory } from "@/action/story-action";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UploadDropzone } from "@/utils/uploadthing";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const CreateStory = () => {
    const [imageUrl, setImageurl] = useState("");
    const { execute, result } = useAction(createStory, {
        onSuccess: () => {
            console.log("success");
            toast.success("Story created successfully.");
        },
        onError: (error) => {
            console.log(error, "error");
            toast.error("Failed to create story.");
        },
    });

    console.log(result);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex h-12 w-full items-center space-x-2 rounded-md p-2 hover:bg-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="ml-1 flex h-6 w-6 items-start text-gray-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    <span className="text-start text-sm font-medium text-gray-400">Create Story</span>
                </button>
            </DialogTrigger>
            <DialogContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!imageUrl) {
                            toast.error("Please upload an image.");
                            return;
                        }
                        execute({
                            url: imageUrl,
                            durations: 5000,
                            type: "image"
                        });
                    }}
                >
                    <input type="hidden" name="imageUrl" value={imageUrl} />
                    <UploadDropzone
                        className="ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
                        content={{}}
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            setImageurl(res?.[0].url);
                            console.log("Files: ", res);
                            toast.success("Upload complete.");
                        }}
                        onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                    <Button type="submit" className="mt-3 w-full">Create Story</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateStory;
