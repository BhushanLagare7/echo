"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { BotIcon, PhoneIcon, SettingsIcon, UnplugIcon } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";

import { VapiPhoneAssistantsTab } from "./vapi-phone-assistants-tab";
import { VapiPhoneNumbersTab } from "./vapi-phone-numbers-tab";

interface VapiConnectedViewProps {
  onDisconnect: () => void;
}

export const VapiConnectedView = ({ onDisconnect }: VapiConnectedViewProps) => {
  const [activeTab, setActiveTab] = useState("phone-numbers");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <Image src="/vapi.jpg" alt="Vapi" width={48} height={48} />
              <div>
                <CardTitle>Vapi Integration</CardTitle>
                <CardDescription>
                  Manage your phone numbers and AI assistants
                </CardDescription>
              </div>
            </div>

            <Button size="sm" variant="destructive" onClick={onDisconnect}>
              <UnplugIcon />
              Disconnect
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="flex justify-center items-center rounded-lg border size-12 bg-muted">
                <SettingsIcon className="size-6 text-muted-foreground" />
              </div>
              <div>
                <CardTitle>Widget Configuration</CardTitle>
                <CardDescription>
                  Set up voice calls for your chat widget
                </CardDescription>
              </div>
            </div>
            <Button asChild>
              <Link href="/customization">
                <SettingsIcon />
                Configure
              </Link>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="overflow-hidden rounded-lg border bg-background">
        <Tabs
          className="gap-0"
          defaultValue="phone-numbers"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="grid grid-cols-2 p-0 w-full h-12">
            <TabsTrigger className="h-full rounded-none" value="phone-numbers">
              <PhoneIcon />
              Phone Numbers
            </TabsTrigger>
            <TabsTrigger className="h-full rounded-none" value="assistants">
              <BotIcon />
              AI Assistants
            </TabsTrigger>
          </TabsList>
          <TabsContent value="phone-numbers">
            <VapiPhoneNumbersTab />
          </TabsContent>
          <TabsContent value="assistants">
            <VapiPhoneAssistantsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
