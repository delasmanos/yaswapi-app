import { Skeleton } from "@/components/ui/skeleton";

export default function PeopleLoading() {
  return (
    <div
      aria-busy="true"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}
