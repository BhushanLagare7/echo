"use node";

import { v } from "convex/values";

import { internal } from "../_generated/api";
import { internalAction } from "../_generated/server";
import { encrypt } from "../lib/secrets";

export const upsert = internalAction({
  args: {
    organizationId: v.string(),
    service: v.union(v.literal("vapi")),
    value: v.any(),
  },
  handler: async (ctx, args) => {
    const secretName = `tenant/${args.organizationId}/${args.service}`;
    const secretValue = encrypt(JSON.stringify(args.value));

    await ctx.runMutation(internal.system.plugins.upsert, {
      organizationId: args.organizationId,
      service: args.service,
      secretName,
      value: secretValue,
    });

    return { status: "success" };
  },
});
