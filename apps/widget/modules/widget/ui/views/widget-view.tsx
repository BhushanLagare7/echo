"use client";

import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-header";

interface WidgetViewProps {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: WidgetViewProps) => {
  return (
    // TODO: Confirm whether we need "min-h-screen" and "min-w-screen" or not
    <main className="flex overflow-hidden flex-col w-full h-full min-h-screen rounded-xl border min-w-screen bg-muted">
      <WidgetHeader>
        <div className="flex flex-col gap-y-2 justify-between px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">How can we help you today?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1">WidgetView: {organizationId}</div>
      <WidgetFooter />
    </main>
  );
};
