import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardLinkProps = {
  href: string;
  title: string;
  children: React.ReactNode;
};
/**
 * INFO: Wrapping the whole card is normally not a good idea but in this case only planet name will be anounced as a link which is ok i think
 */
export const CardLink = ({ href, title, children }: CardLinkProps) => (
  <Link href={href} className="block h-full">
    <Card className="h-full hover:bg-muted/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{children}</CardDescription>
      </CardHeader>
    </Card>
  </Link>
);
