import Image from "next/image";

export const ConversationsView = () => {
  return (
    <div className="flex flex-col flex-1 gap-y-4 h-full bg-muted">
      <div className="flex flex-1 gap-x-2 justify-center items-center">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <p className="text-lg font-semibold">Echo</p>
      </div>
    </div>
  );
};
