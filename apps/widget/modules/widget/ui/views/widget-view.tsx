"use client";

import { useAtomValue } from "jotai";

import { screenAtom } from "../../atoms/widget-atoms";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";

interface WidgetViewProps {
  organizationId: string | null;
}

export const WidgetView = ({ organizationId }: WidgetViewProps) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    error: <WidgetErrorScreen />,
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    selection: <p>TODO: Selection screen</p>,
    voice: <p>TODO: Voice screen</p>,
    auth: <WidgetAuthScreen />,
    inbox: <p>TODO: Inbox screen</p>,
    chat: <p>TODO: Chat screen</p>,
    contact: <p>TODO: Contact screen</p>,
  };

  return (
    // TODO: Confirm whether we need "m in-h-screen" and "min-w-screen" or not
    <main className="flex overflow-hidden flex-col w-full h-full min-h-screen rounded-xl border min-w-screen bg-muted">
      {screenComponents[screen]}
    </main>
  );
};
