"use client";

import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";

import { api } from "@workspace/backend/_generated/api";

import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <>
      <Authenticated>
        <div className="flex flex-col justify-center items-center min-h-svh">
          <p>apps/web/app/page.tsx</p>
          <UserButton />
          <Button onClick={() => addUser()}>Add User</Button>
          <div className="mx-auto w-full max-w-sm">
            <pre>{JSON.stringify(users, null, 2)}</pre>
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Must be signed in!</p>
        <SignInButton>Sign in!</SignInButton>
      </Unauthenticated>
    </>
  );
}
