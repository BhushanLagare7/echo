"use client";

import { useState } from "react";
import Image from "next/image";

import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { useOrganization } from "@clerk/nextjs";

import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";

import { IntegrationId, INTEGRATIONS } from "../../constants";
import { createScript } from "../../utils";

export const IntegrationsView = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedSnippet, setSelectedSnippet] = useState<string>("");

  const { organization } = useOrganization();

  const handleIntegrationClick = (integrationId: IntegrationId) => {
    if (!organization) {
      toast.error("Organization ID not found");
      return;
    }

    const snippet = createScript(integrationId, organization.id);
    setSelectedSnippet(snippet);
    setDialogOpen(true);
  };

  const handleCopy = async () => {
    if (!organization) return;

    try {
      await navigator.clipboard.writeText(organization.id);
      toast.success("Organization ID copied to clipboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy organization ID");
    }
  };

  return (
    <>
      <IntegrationsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        snippet={selectedSnippet}
      />
      <div className="flex flex-col p-8 min-h-screen bg-muted">
        <div className="mx-auto w-full max-w-screen-md">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl">Setup & Integrations</h1>
            <p className="text-muted-foreground">
              Choose the right integrations for you.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="flex gap-4 items-center">
              <Label className="w-34" htmlFor="organization-id">
                Organization ID
              </Label>
              <Input
                id="organization-id"
                className="flex-1 font-mono text-sm bg-background"
                value={organization?.id ?? ""}
                readOnly
                disabled
              />
              <Button className="gap-2" onClick={handleCopy} size="sm">
                <CopyIcon className="size-4" />
                Copy
              </Button>
            </div>
          </div>

          <Separator className="my-8" />
          <div className="space-y-6">
            <div className="space-y-1">
              <Label className="text-lg">Integrations</Label>
              <p className="text-sm text-muted-foreground">
                Add the following code to your website to enable the chatbox.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {INTEGRATIONS.map((integration) => (
                <button
                  key={integration.id}
                  className="flex gap-4 items-center p-4 rounded-lg border bg-background hover:bg-accent"
                  onClick={() => handleIntegrationClick(integration.id)}
                  type="button"
                >
                  <Image
                    src={integration.icon}
                    alt={integration.title}
                    width={32}
                    height={32}
                  />
                  <p>{integration.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const IntegrationsDialog = ({
  open,
  onOpenChange,
  snippet,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  snippet: string;
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      toast.success("Snippet copied to clipboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy snippet");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Integrate with your website</DialogTitle>
          <DialogDescription>
            Follow these steps to add the chatbox to your website.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="p-2 text-sm rounded-md bg-accent">
              1. Copy the following code
            </div>
            <div className="relative group">
              <pre className="max-h-[300px] overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded-md bg-foreground p-2 font-mono text-secondary text-sm">
                {snippet}
              </pre>
              <Button
                className="absolute top-4 right-6 opacity-0 transition-opacity size-6 group-hover:opacity-100"
                size="icon"
                variant="secondary"
                onClick={handleCopy}
              >
                <CopyIcon className="size-3" />
              </Button>
            </div>
          </div>

          <div>
            <div className="space-y-2">
              <div className="p-2 text-sm rounded-md bg-accent">
                2. Add the following code to your page
              </div>
              <p className="text-sm text-muted-foreground">
                Paste the chatbox code above in your page. You can add it in the
                HTML head section.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
