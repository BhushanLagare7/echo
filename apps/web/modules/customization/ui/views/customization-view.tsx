"use client";

import { useQuery } from "convex/react";
import { Loader2Icon } from "lucide-react";

import { api } from "@workspace/backend/_generated/api";

import { CustomizationForm } from "../components/customization-form";

export const CustomizationView = () => {
  const widgetSettings = useQuery(api.private.widgetSettings.getOne);
  const vapiPlugin = useQuery(api.private.plugins.getOne, {
    service: "vapi",
  });

  const isLoading = widgetSettings === undefined || vapiPlugin === undefined;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-2 justify-center items-center p-8 min-h-screen bg-muted">
        <Loader2Icon className="animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 min-h-screen bg-muted">
      <div className="mx-auto w-full max-w-screen-md">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl">Widget Customization</h1>
          <p className="text-muted-foreground">
            Customize how your chat widget looks and behaves for your customers.
          </p>
        </div>

        <div className="mt-8">
          <CustomizationForm
            initialData={widgetSettings}
            hasVapiPlugin={!!vapiPlugin}
          />
        </div>
      </div>
    </div>
  );
};
