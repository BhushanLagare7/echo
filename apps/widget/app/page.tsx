"use client";

import { useMutation, useQuery } from "convex/react";

import { api } from "@workspace/backend/_generated/api";

import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <div className="flex flex-col justify-center items-center min-h-svh">
      <p>apps/widget/app/page.tsx</p>
      <Button onClick={() => addUser()}>Add User</Button>
      <div className="mx-auto w-full max-w-sm">
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div>
    </div>
  );
}
