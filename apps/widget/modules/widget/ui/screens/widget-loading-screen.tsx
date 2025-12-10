"use client";

import { useEffect, useState } from "react";

import { useAction, useMutation } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";
import { LoaderIcon } from "lucide-react";

import { api } from "@workspace/backend/_generated/api";

import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "../../atoms/widget-atoms";
import { WidgetHeader } from "../components/widget-header";

type InitStep = "org" | "session" | "settings" | "vapi" | "done";

export const WidgetLoadingScreen = ({
  organizationId,
}: {
  organizationId: string | null;
}) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState<boolean>(false);

  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setScreen = useSetAtom(screenAtom);

  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  // Step 1: Validate Organization
  const validateOrganization = useAction(api.public.organizations.validate);
  useEffect(() => {
    if (step !== "org") {
      return;
    }

    setLoadingMessage("Finding Organization ID...");

    if (!organizationId) {
      setErrorMessage("Organization ID is required");
      setScreen("error");
      return;
    }

    setLoadingMessage("Verifying Organization...");
    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId);
          setStep("session");
        } else {
          setErrorMessage(result.reason || "Invalid configuration");
          setScreen("error");
        }
      })
      .catch(() => {
        setErrorMessage("Failed to verify organization");
        setScreen("error");
      });
  }, [
    organizationId,
    setErrorMessage,
    setLoadingMessage,
    setOrganizationId,
    setScreen,
    step,
    validateOrganization,
  ]);

  // Step 2: Validate Session (if it exists)
  const validateContactSession = useMutation(
    api.public.contactSessions.validate
  );
  useEffect(() => {
    if (step !== "session") {
      return;
    }

    setLoadingMessage("Finding Contact Session ID...");

    if (!contactSessionId) {
      setSessionValid(false);
      setStep("done");
      return;
    }

    setLoadingMessage("Validating Session...");
    validateContactSession({ contactSessionId })
      .then((result) => {
        if (result.valid) {
          setSessionValid(true);
          setStep("done");
        } else {
          setErrorMessage(result.reason || "Invalid session");
          setScreen("error");
        }
      })
      .catch(() => {
        setSessionValid(false);
        setStep("done");
      });
  }, [
    contactSessionId,
    setErrorMessage,
    setLoadingMessage,
    setScreen,
    step,
    validateContactSession,
  ]);

  useEffect(() => {
    if (step !== "done") {
      return;
    }

    const hasValidSession = sessionValid && contactSessionId;
    setScreen(hasValidSession ? "selection" : "auth");
  }, [contactSessionId, sessionValid, setScreen, step]);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col gap-y-2 justify-between px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-col flex-1 gap-y-4 justify-center items-center p-4 text-muted-foreground">
        <LoaderIcon className="animate-spin" />
        <p className="text-sm">{loadingMessage || "Loading..."}</p>
      </div>
    </>
  );
};
