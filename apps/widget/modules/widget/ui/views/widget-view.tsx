"use client";

// import { WidgetFooter } from "../components/widget-footer";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";

interface WidgetViewProps {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: WidgetViewProps) => {
  return (
    // TODO: Confirm whether we need "min-h-screen" and "min-w-screen" or not
    <main className="flex overflow-hidden flex-col w-full h-full min-h-screen rounded-xl border min-w-screen bg-muted">
      <WidgetAuthScreen />
      {/* <WidgetFooter /> */}
    </main>
  );
};
