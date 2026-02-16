"use client";
import dynamic from "next/dynamic";

const OfflineFirstQueryProvider = dynamic(
  () =>
    import("@/components/provider/PersistentQueryProvider").then(
      (mod) => mod.OfflineFirstQueryProvider,
    ),
  { ssr: false },
);

export const ClientOnlyListShell = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <OfflineFirstQueryProvider>{children}</OfflineFirstQueryProvider>;
};
