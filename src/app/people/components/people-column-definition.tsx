import { Button } from "@/components/ui/button";
import { Person } from "@/features/people/types";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const Aligned = ({
  children,
  fontMedium,
  align = "left",
}: {
  children: React.ReactNode;
  fontMedium?: boolean;
  align?: "left" | "right" | "center";
}) => (
  <div
    className={cn({
      "font-medium": fontMedium,
      "text-right": align === "right",
      "text-center": align === "center",
      "text-left": align === "left",
    })}
  >
    {children}
  </div>
);
const SortButton = ({
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
export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Aligned align="left">
        <SortButton className="has-[>svg]:px-0 " column={column}>
          Name
        </SortButton>
      </Aligned>
    ),
    cell: ({ row }) => {
      const person = row.original;
      return (
        <Button variant="link" className="p-0 h-auto font-medium">
          {/* <Link href={`/people/${person.id}`}>{person.name}</Link> */}
          {person.name}
        </Button>
      );
    },
  },
  {
    accessorKey: "birthYear",
    header: "Birth Year",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "height",
    header: ({ column }) => (
      <Aligned align="right">
        <SortButton column={column}>Height (cm)</SortButton>
      </Aligned>
    ),
    cell: ({ row }) => {
      const v = isNaN(row.getValue("height"))
        ? "-"
        : Number(row.getValue("height"));
      return (
        <Aligned fontMedium align="right">
          {v}
        </Aligned>
      );
    },
  },
  {
    accessorKey: "mass",
    sortUndefined: 1,

    header: ({ column }) => (
      <Aligned align="right">
        <SortButton column={column}>Mass (kg)</SortButton>
      </Aligned>
    ),
    cell: ({ row }) => {
      return (
        <Aligned fontMedium align="right">
          {row.getValue("mass") ?? "-"}
        </Aligned>
      );
    },
  },
  {
    accessorKey: "filmCount",
    // 2. Put null/undefined at the bottom
    sortUndefined: 1,
    header: ({ column }) => {
      return (
        <Aligned align="right">
          <SortButton column={column}>Film appearances</SortButton>
        </Aligned>
      );
    },
    cell: ({ row }) => {
      const filmsCount = row.getValue("filmCount") as number;
      return (
        <Aligned fontMedium align="right">
          {filmsCount}
        </Aligned>
      );
    },
  },
  {
    accessorKey: "vehicleCount",
    sortUndefined: 1,
    header: ({ column }) => {
      return (
        <Aligned align="right">
          <SortButton column={column}>Vehicles</SortButton>
        </Aligned>
      );
    },
    cell: ({ row }) => {
      const vehicles = row.getValue("vehicleCount") as number;
      return (
        <Aligned fontMedium align="right">
          {vehicles}
        </Aligned>
      );
    },
  },
  {
    accessorKey: "starshipCount",
    sortUndefined: 1,
    header: ({ column }) => {
      return (
        <Aligned align="right">
          <SortButton column={column}>Starships</SortButton>
        </Aligned>
      );
    },
    cell: ({ row }) => {
      const starships = row.getValue("starshipCount") as number;
      return (
        <Aligned fontMedium align="right">
          {starships}
        </Aligned>
      );
    },
  },
];
