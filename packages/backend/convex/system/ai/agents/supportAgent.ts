import { google } from "@ai-sdk/google";
import { Agent } from "@convex-dev/agent";

import { components } from "../../../_generated/api";

export const supportAgent = new Agent(components.agent, {
  name: "Support Agent",
  languageModel: google.chat("gemini-2.5-flash-lite"),
  instructions: `You are a customer support agent. 
  You can use the following tools:
  - resolveConversation: When user expresses finalization of a conversation.
  - escalateConversation: When user expresses frustration or requests a human explicitly
`,
});
