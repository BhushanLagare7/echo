"use client";

import { useAtomValue } from "jotai";

import { screenAtom } from "../../atoms/widget-atoms";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { WidgetChatScreen } from "../screens/widget-chat-screen";
import { WidgetContactScreen } from "../screens/widget-contact-screen";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetInboxScreen } from "../screens/widget-inbox-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";
import { WidgetSelectionScreen } from "../screens/widget-selection-screen";
import { WidgetVoiceScreen } from "../screens/widget-voice-screen";

interface WidgetViewProps {
  organizationId: string | null;
}

export const WidgetView = ({ organizationId }: WidgetViewProps) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    error: <WidgetErrorScreen />,
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    selection: <WidgetSelectionScreen />,
    voice: <WidgetVoiceScreen />,
    auth: <WidgetAuthScreen />,
    inbox: <WidgetInboxScreen />,
    chat: <WidgetChatScreen />,
    contact: <WidgetContactScreen />,
  };

  return (
    <main className="flex overflow-hidden flex-col w-full h-full rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  );
};
