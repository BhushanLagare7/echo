import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";

import { Id } from "@workspace/backend/_generated/dataModel";

import { CONTACT_SESSION_KEY } from "../constants";
import { WidgetScreen } from "../types";

// Basic widget state atoms
export const screenAtom = atom<WidgetScreen>("loading");

export const organizationIdAtom = atom<string | null>(null);

export const errorMessageAtom = atom<string | null>(null);

export const loadingMessageAtom = atom<string | null>(null);

// Organization-Scoped contact session atoms
export const contactSessionIdAtomFamily = atomFamily((organizationId: string) =>
  atomWithStorage<Id<"contactSessions"> | null>(
    `${CONTACT_SESSION_KEY}_${organizationId}`,
    null
  )
);
