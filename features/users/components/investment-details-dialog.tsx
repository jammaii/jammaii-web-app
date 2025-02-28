"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowUpRight,
  CalendarDays,
  CircleDollarSign,
  Clock,
} from "lucide-react";
import { UserInvestmentResponse } from "@/features/users/types/app";
import Link from "next/link";
import { ProjectTimeline } from "@/features/projects/components/timeline";

interface InvestmentDetailsProps {
  investment: UserInvestmentResponse;
  children: React.ReactNode;
}

export function InvestmentDetailsDialog({
  investment,
  children,
}: InvestmentDetailsProps) {
  const totalInvestment = investment.slots * investment.slotPrice;
  const today = new Date();
  const totalDays = Math.ceil(
    (investment.project.endDate.getTime() -
      investment.project.startDate.getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const remainingDays = Math.ceil(
    (investment.project.endDate.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const progressPercentage = Math.max(
    0,
    Math.min(100, ((totalDays - remainingDays) / totalDays) * 100),
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{investment.project.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Investment Amount */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CircleDollarSign className="h-4 w-4" />
              <span>
                {investment.slots} slots × ₦
                {formatCurrency(investment.slotPrice)}
              </span>
            </div>
            <div className="text-lg font-semibold">
              ₦{formatCurrency(totalInvestment)}
              <span className="ml-2 text-sm text-muted-foreground">
                Total invested
              </span>
            </div>
          </div>

          {/* Project Timeline */}
          <ProjectTimeline
            startDate={investment.project.startDate}
            endDate={investment.project.endDate}
          />

          {/* Project Details */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Project Details</h4>
            <div className="scrollbar-thin scrollbar-thumb-muted-foreground/10 scrollbar-track-muted max-h-24 overflow-y-auto pr-2">
              <p className="text-sm text-muted-foreground">
                {investment.project.description}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {investment.project.location}
            </p>
          </div>

          {/* Link to project} */}
          <Link
            href={`/user/project/${investment.project.id}`}
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <span>View project details</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          {/* Expected Returns */}
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Expected Returns</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              ₦{formatCurrency(totalInvestment * 1.25)}
            </div>
            <p className="text-xs text-muted-foreground">
              Estimated return at maturity
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
