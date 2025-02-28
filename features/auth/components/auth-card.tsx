import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  children: React.ReactNode;
}

export const AuthCard = ({
  headerContent,
  footerContent,
  children,
  className,
  ...props
}: AuthCardProps) => {
  return (
    <Card className={cn("w-full max-w-md", className)} {...props}>
      {headerContent && <CardHeader>{headerContent}</CardHeader>}
      <CardContent>{children}</CardContent>
      {footerContent && <CardFooter>{footerContent}</CardFooter>}
    </Card>
  );
};
