import { useEffect, useState } from "react";

import { useAction } from "convex/react";
import { toast } from "sonner";

import { api } from "@workspace/backend/_generated/api";

export type PhoneNumbers = typeof api.private.vapi.getPhoneNumbers._returnType;
export type Assistants = typeof api.private.vapi.getAssistants._returnType;

export const useVapiAssistants = (): {
  assistants: Assistants;
  isLoading: boolean;
  error: Error | null;
} => {
  const [assistants, setAssistants] = useState<Assistants>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const getAssistants = useAction(api.private.vapi.getAssistants);

  useEffect(() => {
    let cancelled = false;

    const fetchAssistants = async () => {
      try {
        setIsLoading(true);
        const assistants = await getAssistants();
        if (cancelled) return;
        setAssistants(assistants);
      } catch (error) {
        if (cancelled) return;
        setError(error as Error);
        toast.error("Failed to fetch assistants");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };
    fetchAssistants();

    return () => {
      cancelled = true;
    };
  }, []);

  return { assistants, isLoading, error };
};

export const useVapiPhoneNumbers = (): {
  phoneNumbers: PhoneNumbers;
  isLoading: boolean;
  error: Error | null;
} => {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumbers>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const getPhoneNumbers = useAction(api.private.vapi.getPhoneNumbers);

  useEffect(() => {
    let cancelled = false;

    const fetchPhoneNumbers = async () => {
      try {
        setIsLoading(true);
        const phoneNumbers = await getPhoneNumbers();
        if (cancelled) return;
        setPhoneNumbers(phoneNumbers);
      } catch (error) {
        if (cancelled) return;
        setError(error as Error);
        toast.error("Failed to fetch phone numbers");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };
    fetchPhoneNumbers();

    return () => {
      cancelled = true;
    };
  }, []);

  return { phoneNumbers, isLoading, error };
};
