import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const SortButton = ({
  column,
  children,
  className,
}: {
  column: any;
  children: React.ReactNode;
  className?: string;
}) => (
  <Button
    className={className}
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {children}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);
