import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";

import { ContactPanel } from "../components/contact-panel";

export const ConversationIdLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="flex-1 h-full">
      <ResizablePanel className="h-full" defaultSize={60}>
        <div className="flex flex-col flex-1 h-full">{children}</div>
      </ResizablePanel>
      <ResizableHandle className="hidden lg:block" />
      <ResizablePanel
        className="hidden lg:block"
        defaultSize={40}
        maxSize={40}
        minSize={20}
      >
        <div className="flex flex-col flex-1 h-full">
          <ContactPanel />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
