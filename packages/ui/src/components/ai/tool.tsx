"use client";

import type { ComponentProps, ReactNode } from "react";

import {
  CheckCircleIcon,
  ChevronDownIcon,
  CircleIcon,
  ClockIcon,
  WrenchIcon,
  XCircleIcon,
} from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { cn } from "@workspace/ui/lib/utils";

export type AIToolStatus = "pending" | "running" | "completed" | "error";

export type AIToolProps = ComponentProps<typeof Collapsible> & {
  status?: AIToolStatus;
};

export const AITool = ({ className, ...props }: AIToolProps) => (
  <Collapsible
    className={cn(
      "mb-4 w-full rounded-md border not-prose bg-background",
      className
    )}
    {...props}
  />
);

export type AIToolHeaderProps = ComponentProps<typeof CollapsibleTrigger> & {
  status?: AIToolStatus;
  name: string;
  description?: string;
};

const getStatusBadge = (status: AIToolStatus) => {
  const labels = {
    pending: "Pending",
    running: "Running",
    completed: "Completed",
    error: "Error",
  } as const;

  const icons = {
    pending: <CircleIcon className="size-4" />,
    running: <ClockIcon className="animate-pulse size-4" />,
    completed: <CheckCircleIcon className="text-green-600 size-4" />,
    error: <XCircleIcon className="text-red-600 size-4" />,
  } as const;

  return (
    <Badge className="text-xs rounded-full" variant="secondary">
      {icons[status]}
      {labels[status]}
    </Badge>
  );
};

export const AIToolHeader = ({
  className,
  status = "pending",
  name,
  ...props
}: AIToolHeaderProps) => (
  <CollapsibleTrigger
    className={cn(
      "flex gap-4 justify-between items-center p-3 w-full",
      className
    )}
    {...props}
  >
    <div className="flex gap-2 items-center">
      <WrenchIcon className="size-4 text-muted-foreground" />
      <span className="text-sm font-medium">{name}</span>
      {getStatusBadge(status)}
    </div>
    <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
  </CollapsibleTrigger>
);

export type AIToolContentProps = ComponentProps<typeof CollapsibleContent>;

export const AIToolContent = ({ className, ...props }: AIToolContentProps) => (
  <CollapsibleContent
    className={cn("grid overflow-hidden gap-4 p-4 text-sm border-t", className)}
    {...props}
  />
);

export type AIToolParametersProps = ComponentProps<"div"> & {
  parameters: Record<string, unknown>;
};

export const AIToolParameters = ({
  className,
  parameters,
  ...props
}: AIToolParametersProps) => (
  <div className={cn("space-y-2", className)} {...props}>
    <h4 className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
      Parameters
    </h4>
    <div className="p-3 rounded-md bg-muted/50">
      <pre className="overflow-x-auto text-xs text-muted-foreground">
        {JSON.stringify(parameters, null, 2)}
      </pre>
    </div>
  </div>
);

export type AIToolResultProps = ComponentProps<"div"> & {
  result?: ReactNode;
  error?: string;
};

export const AIToolResult = ({
  className,
  result,
  error,
  ...props
}: AIToolResultProps) => {
  if (!(result || error)) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <h4 className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
        {error ? "Error" : "Result"}
      </h4>
      <div
        className={cn(
          "overflow-x-auto p-3 text-xs rounded-md",
          error
            ? "bg-destructive/10 text-destructive"
            : "bg-muted/50 text-foreground"
        )}
      >
        {error ? <div>{error}</div> : <div>{result}</div>}
      </div>
    </div>
  );
};
