import { forwardRef } from "react";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

interface InfiniteScrollTriggerProps {
  canLoadMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  loadMoreText?: string;
  noMoreText?: string;
  className?: string;
}

export const InfiniteScrollTrigger = forwardRef<
  HTMLDivElement,
  InfiniteScrollTriggerProps
>(
  (
    {
      canLoadMore,
      isLoadingMore,
      onLoadMore,
      loadMoreText = "Load More",
      noMoreText = "No more items",
      className,
    },
    ref
  ) => {
    let text = loadMoreText;

    if (isLoadingMore) {
      text = "Loading...";
    } else if (!canLoadMore) {
      text = noMoreText;
    }

    return (
      <div
        ref={ref}
        className={cn("flex justify-center py-2 w-full", className)}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onLoadMore}
          disabled={isLoadingMore || !canLoadMore}
        >
          {text}
        </Button>
      </div>
    );
  }
);

InfiniteScrollTrigger.displayName = "InfiniteScrollTrigger";
