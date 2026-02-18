import { Aligned } from "@/components/data-display/table/AlignedCell";
import { SortButton } from "@/components/data-display/table/SortButton";
import { Button } from "@/components/ui/button";
import { Planet } from "@/features/planets/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Planet>[] = [
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
      const planet = row.original;
      return (
        <Button variant="link" asChild className="p-0 h-auto font-medium">
          <Link href={`/planets/${planet.id}`}>{planet.name}</Link>
          {/* {planet.name} */}
        </Button>
      );
    },
  },
  {
    accessorKey: "rotationPeriod",
    header: "Rotation Period",
  },
  {
    accessorKey: "orbitalPeriod",
    header: "Orbital Period",
  },
  {
    accessorKey: "diameter",
    sortUndefined: 1,
    header: ({ column }) => (
      <Aligned align="right">
        <SortButton column={column}>Diameter (km)</SortButton>
      </Aligned>
    ),
    cell: ({ row }) => {
      const v = isNaN(row.getValue("diameter") as number)
        ? "-"
        : Number(row.getValue("diameter") as number).toLocaleString();
      return (
        <Aligned fontMedium align="right">
          {v}
        </Aligned>
      );
    },
  },
  {
    accessorKey: "climate",
    header: "Climate",
  },
  {
    accessorKey: "gravity",
    // 2. Put null/undefined at the bottom
    sortUndefined: 1,
    header: ({ column }) => {
      return (
        <Aligned align="right">
          <SortButton column={column}>Gravity</SortButton>
        </Aligned>
      );
    },
    cell: ({ row }) => {
      const gravity = row.getValue("gravity") as number;
      return (
        <Aligned fontMedium align="right">
          {gravity === null ? "-" : gravity.toLocaleString()}
        </Aligned>
      );
    },
  },
  {
    accessorKey: "terrain",
    sortUndefined: 1,
    header: ({ column }) => {
      return (
        <Aligned align="right">
          <SortButton column={column}>Terrain</SortButton>
        </Aligned>
      );
    },
    cell: ({ row }) => {
      const terrain = row.getValue("terrain") as string;
      return (
        <Aligned fontMedium align="right">
          {terrain === "" ? "-" : terrain}
        </Aligned>
      );
    },
  },
  {
    accessorKey: "surfaceWater",
    sortUndefined: 1,
    header: ({ column }) => {
      return (
        <Aligned align="right">
          <SortButton column={column}>Surface Water (%)</SortButton>
        </Aligned>
      );
    },
    cell: ({ row }) => {
      const surfaceWater = row.getValue("surfaceWater") as number;
      return (
        <Aligned fontMedium align="right">
          {surfaceWater === null ? "-" : surfaceWater.toLocaleString()}
        </Aligned>
      );
    },
  },
  {
    accessorKey: "population",
    sortUndefined: 1,
    header: ({ column }) => {
      return (
        <Aligned align="right">
          <SortButton column={column}>Population</SortButton>
        </Aligned>
      );
    },
    cell: ({ row }) => {
      const population = row.getValue("population") as number;
      return (
        <Aligned fontMedium align="right">
          {population === null ? "-" : population.toLocaleString()}
        </Aligned>
      );
    },
  },
  {
    accessorKey: "filmCount",
    sortUndefined: 1,
    header: "Films",
  },
];
