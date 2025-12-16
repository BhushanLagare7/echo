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
    const fetchAssistants = async () => {
      try {
        setIsLoading(true);
        const assistants = await getAssistants();
        setAssistants(assistants);
      } catch (error) {
        setError(error as Error);
        toast.error("Failed to fetch assistants");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssistants();
  }, [getAssistants]);

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
    const fetchPhoneNumbers = async () => {
      try {
        setIsLoading(true);
        const phoneNumbers = await getPhoneNumbers();
        setPhoneNumbers(phoneNumbers);
      } catch (error) {
        setError(error as Error);
        toast.error("Failed to fetch phone numbers");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhoneNumbers();
  }, [getPhoneNumbers]);

  return { phoneNumbers, isLoading, error };
};
