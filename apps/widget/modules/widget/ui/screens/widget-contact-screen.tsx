import { useState } from "react";
import Link from "next/link";

import { useAtomValue, useSetAtom } from "jotai";
import { ArrowLeftIcon, CheckIcon, CopyIcon, PhoneIcon } from "lucide-react";

import { Button } from "@workspace/ui/components/button";

import { screenAtom, widgetSettingsAtom } from "../../atoms/widget-atoms";
import { WidgetHeader } from "../components/widget-header";

export const WidgetContactScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const widgetSettings = useAtomValue(widgetSettingsAtom);

  const phoneNumber = widgetSettings?.vapiSettings?.phoneNumber;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!phoneNumber) return;

    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy phone number:", error);
    } finally {
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
          <p>Contact Us</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-col gap-y-4 justify-center items-center h-full">
        <div className="flex justify-center items-center p-3 bg-white rounded-full border">
          <PhoneIcon className="size-6 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">Available 24/7</p>
        <p className="text-2xl font-bold">{phoneNumber}</p>
      </div>
      <div className="p-4 border-t bg-background">
        <div className="flex flex-col gap-y-2 items-center">
          <Button
            className="w-full"
            variant="outline"
            size="lg"
            onClick={handleCopy}
            disabled={copied}
          >
            {copied ? (
              <>
                <CheckIcon className="mr-2 size-4" />
                Copied!
              </>
            ) : (
              <>
                <CopyIcon className="mr-2 size-4" />
                Copy Number
              </>
            )}
          </Button>
          <Button className="w-full" size="lg" asChild>
            <Link href={`tel:${phoneNumber}`}>
              <PhoneIcon />
              Call Now
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};
