import { HomeIcon, InboxIcon } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

export const WidgetFooter = () => {
  const screen = "selection";

  return (
    <footer className="flex justify-center items-center border-t bg-background">
      <Button
        className="flex-1 h-14 rounded-none"
        onClick={() => {}}
        size="icon"
        variant="ghost"
      >
        <HomeIcon
          className={cn("size-5", screen === "selection" && "text-primary")}
        />
      </Button>
      <Button
        className="flex-1 h-14 rounded-none"
        onClick={() => {}}
        size="icon"
        variant="ghost"
      >
        <InboxIcon
          className={cn("size-5", screen === "inbox" && "text-primary")}
        />
      </Button>
    </footer>
  );
};
