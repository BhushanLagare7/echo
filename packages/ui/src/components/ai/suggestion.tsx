"use client";

import type { ComponentProps } from "react";

import { Button } from "@workspace/ui/components/button";
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area";
import { cn } from "@workspace/ui/lib/utils";

export type AISuggestionsProps = ComponentProps<typeof ScrollArea>;

export const AISuggestions = ({
  className,
  children,
  ...props
}: AISuggestionsProps) => (
  <ScrollArea className="overflow-x-auto w-full whitespace-nowrap" {...props}>
    <div className={cn("flex flex-nowrap gap-2 items-center w-max", className)}>
      {children}
    </div>
    <ScrollBar className="hidden" orientation="horizontal" />
  </ScrollArea>
);

export type AISuggestionProps = Omit<
  ComponentProps<typeof Button>,
  "onClick"
> & {
  suggestion: string;
  onClick?: (suggestion: string) => void;
};

export const AISuggestion = ({
  suggestion,
  onClick,
  className,
  variant = "outline",
  size = "sm",
  children,
  ...props
}: AISuggestionProps) => {
  const handleClick = () => {
    onClick?.(suggestion);
  };

  return (
    <Button
      className={cn("px-4 rounded-full cursor-pointer", className)}
      onClick={handleClick}
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      {children || suggestion}
    </Button>
  );
};
