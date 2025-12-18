"use client";

import { PricingTable } from "../components/pricing-table";

export const BillingView = () => {
  return (
    <div className="flex flex-col p-8 min-h-screen bg-muted">
      <div className="mx-auto w-full max-w-screen-md">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl">Plans & Billings</h1>
          <p>Choose the plan that&apos;s right for you.</p>
        </div>

        <div className="mt-8">
          <PricingTable />
        </div>
      </div>
    </div>
  );
};
