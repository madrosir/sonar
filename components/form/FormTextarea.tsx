"use client";

import { useFormStatus } from "react-dom";
import { KeyboardEventHandler, forwardRef } from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { FormErrors } from "./FormErrors";

interface FormTextareaProps {
    id: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    
    defaultValue?: string;
};

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({
    id,
    label,
    placeholder,
    required,
    disabled,
    errors,
   
    className,
    defaultValue
}, ref) => {
    const { pending } = useFormStatus();

    return (
        <div className="w-full space-y-2">
            <div className="w-full space-y-1">
                {label ? (
                    <Label
                        htmlFor={id}
                        className="text-md font-semibold text-neutral-700"
                    >
                        {label}
                    </Label>
                ) : null}
                <Textarea
                  
                    ref={ref}
                    required={required}
                    placeholder={placeholder}
                    name={id}
                    id={id}
                    disabled={pending || disabled}
                    className={cn(
                        "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none  border-none scrollbar-none",
                        className
                    )}
                    aria-describedby={`${id}-error`}
                    defaultValue={defaultValue}
                />
            </div>
            <FormErrors
                id={id}
                errors={errors}
            />
        </div>
    )
})

FormTextarea.displayName = "FormTextarea";