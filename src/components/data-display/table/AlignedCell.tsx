import { cn } from "@/lib/utils";

export const Aligned = ({
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
