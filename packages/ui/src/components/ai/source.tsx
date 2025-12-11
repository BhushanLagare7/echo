"use client";

import type { ComponentProps } from "react";

import { BookIcon, ChevronDownIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { cn } from "@workspace/ui/lib/utils";

export type AISourcesProps = ComponentProps<"div">;

export const AISources = ({ className, ...props }: AISourcesProps) => (
  <Collapsible
    className={cn("mb-4 text-xs not-prose text-primary", className)}
    {...props}
  />
);

export type AISourcesTriggerProps = ComponentProps<
  typeof CollapsibleTrigger
> & {
  count: number;
};

export const AISourcesTrigger = ({
  count,
  children,
  ...props
}: AISourcesTriggerProps) => (
  <CollapsibleTrigger className="flex gap-2 items-center" {...props}>
    {children ?? (
      <>
        <p className="font-medium">
          Used {count} {count === 1 ? "source" : "sources"}
        </p>
        <ChevronDownIcon className="w-4 h-4" />
      </>
    )}
  </CollapsibleTrigger>
);

export type AISourcesContentProps = ComponentProps<typeof CollapsibleContent>;

export const AISourcesContent = ({
  className,
  ...props
}: AISourcesContentProps) => (
  <CollapsibleContent
    className={cn("flex flex-col gap-2 mt-3", className)}
    {...props}
  />
);

export type AISourceProps = ComponentProps<"a">;

export const AISource = ({
  href,
  title,
  children,
  ...props
}: AISourceProps) => (
  <a
    className="flex gap-2 items-center"
    href={href}
    rel="noreferrer"
    target="_blank"
    {...props}
  >
    {children ?? (
      <>
        <BookIcon className="w-4 h-4" />
        <span className="block font-medium">{title}</span>
      </>
    )}
  </a>
);
