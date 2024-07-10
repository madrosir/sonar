import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";

type Props = Partial<ButtonProps> & {
  children: React.ReactNode;
};

const ActionIcon = React.forwardRef<HTMLButtonElement, Props>(({ children, ...buttonProps }, ref) => {
  return (
    <Button
      type="submit"
      variant={"ghost"}
      size={"icon"}
      className="h-9 w-9"
      ref={ref}
      {...buttonProps}
    >
      {children}
    </Button>
  );
});

ActionIcon.displayName = 'ActionIcon';

export default ActionIcon;
