import Image from "next/image";

import { ArrowLeftRightIcon, type LucideIcon, PlugIcon } from "lucide-react";

import { Button } from "@workspace/ui/components/button";

export interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface PluginCardProps {
  serviceName: string;
  serviceImage: string;
  features: Feature[];
  onSubmit: () => void;
  isDisabled?: boolean;
}

export const PluginCard = ({
  serviceName,
  serviceImage,
  features,
  onSubmit,
  isDisabled,
}: PluginCardProps) => {
  return (
    <div className="p-8 w-full rounded-lg border h-fit bg-background">
      <div className="flex gap-6 justify-center items-center mb-6">
        <div className="flex flex-col items-center">
          <Image
            src={serviceImage}
            alt={serviceName}
            className="object-contain rounded"
            width={40}
            height={40}
          />
        </div>

        <div className="flex flex-col gap-1 items-center">
          <ArrowLeftRightIcon />
        </div>

        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="Platform"
            className="object-contain"
            width={40}
            height={40}
          />
        </div>
      </div>

      <div className="mb-6 text-center">
        <p className="text-lg">Connect your {serviceName} account</p>
      </div>

      <div className="mb-6">
        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.label} className="flex gap-2 items-center">
              <div className="flex justify-center items-center rounded-lg border size-8 bg-muted">
                <feature.icon className="size-4 text-muted-foreground" />
              </div>

              <div>
                <p className="text-sm font-medium">{feature.label}</p>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button
          className="size-full"
          variant="default"
          onClick={onSubmit}
          disabled={isDisabled}
        >
          Connect
          <PlugIcon />
        </Button>
      </div>
    </div>
  );
};
