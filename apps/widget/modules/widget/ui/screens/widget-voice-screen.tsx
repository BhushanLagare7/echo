import { useSetAtom } from "jotai";
import { ArrowLeftIcon, MicIcon, MicOffIcon } from "lucide-react";

import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

import { screenAtom } from "../../atoms/widget-atoms";
import { useVapi } from "../../hooks/use-vapi";
import { WidgetHeader } from "../components/widget-header";

export const WidgetVoiceScreen = () => {
  const setScreen = useSetAtom(screenAtom);

  const {
    isConnected,
    isSpeaking,
    transcript,
    startCall,
    endCall,
    isConnecting,
  } = useVapi();

  return (
    <>
      <WidgetHeader>
        <div className="flex gap-x-2 items-center">
          <Button
            variant="transparent"
            size="icon"
            onClick={() => setScreen("selection")}
          >
            <ArrowLeftIcon />
          </Button>
          <p>Voice Chat</p>
        </div>
      </WidgetHeader>
      {transcript.length > 0 ? (
        <AIConversation className="flex-1 h-full">
          <AIConversationContent>
            {transcript.map((message, index) => (
              <AIMessage
                key={`${message.role}-${index}-${message.text}`}
                from={message.role}
              >
                <AIMessageContent>{message.text}</AIMessageContent>
              </AIMessage>
            ))}
          </AIConversationContent>
          <AIConversationScrollButton />
        </AIConversation>
      ) : (
        <div className="flex flex-col flex-1 gap-y-4 justify-center items-center h-full">
          <div className="flex justify-center items-center p-3 bg-white rounded-full border">
            <MicIcon className="size-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            Transcript will appear here when you start speaking
          </p>
        </div>
      )}

      <div className="p-4 border-t bg-background">
        <div className="flex flex-col gap-y-4 items-center">
          {isConnected && (
            <div className="flex gap-x-2 items-center">
              <div
                className={cn(
                  "rounded-full size-4",
                  isSpeaking ? "bg-red-500 animate-pulse" : "bg-green-500"
                )}
              />
              <span className="text-sm text-muted-foreground">
                {isSpeaking ? "Assistant Speaking..." : "Listening..."}
              </span>
            </div>
          )}
          <div className="flex justify-center w-full">
            {isConnected ? (
              <Button
                className="w-full"
                variant="destructive"
                size="lg"
                onClick={endCall}
              >
                <MicOffIcon />
                End Call
              </Button>
            ) : (
              <Button
                className="w-full"
                disabled={isConnecting}
                size="lg"
                onClick={startCall}
              >
                <MicIcon />
                Start Call
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
