import { Skeleton } from "./skeleton";
type SkeletonCardListProps = React.ComponentProps<"div">;

export const SkeletonCardList = ({ ...props }: SkeletonCardListProps) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      aria-busy="true"
      aria-label="Loading..."
      {...props}
    >
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
};
