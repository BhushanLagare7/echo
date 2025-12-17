"use node";

import { v } from "convex/values";

import { internal } from "../_generated/api";
import { action } from "../_generated/server";
import { decrypt, parseSecretString } from "../lib/secrets";

export const getVapiSecrets = action({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const plugin = await ctx.runQuery(
      internal.system.plugins.getByOrganizationIdAndService,
      {
        organizationId: args.organizationId,
        service: "vapi",
      }
    );

    if (!plugin) {
      throw null;
    }

    const secretValue = plugin.value;
    const secret = decrypt(secretValue);
    const secretData = parseSecretString<{
      privateApiKey: string;
      publicApiKey: string;
    }>(secret);

    if (!secretData) {
      throw null;
    }

    if (!secretData.privateApiKey || !secretData.publicApiKey) {
      throw null;
    }

    return {
      publicApiKey: secretData.publicApiKey,
    };
  },
});
