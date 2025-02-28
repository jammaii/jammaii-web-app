import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/dates";
import { CalendarDays } from "lucide-react";

interface ProjectTimelineProps {
  startDate: Date;
  endDate: Date;
}

export const ProjectTimeline = ({
  startDate,
  endDate,
}: ProjectTimelineProps) => {
  const today = new Date();
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const remainingDays = Math.ceil(
    (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  const progressPercentage = Math.max(
    0,
    Math.min(100, ((totalDays - remainingDays) / totalDays) * 100),
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>Timeline</span>
          </div>
          <span>{remainingDays} days remaining</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Start Date</p>
          <p className="font-medium">
            {formatDate(startDate, { dateFormat: "PP" })}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">End Date</p>
          <p className="font-medium">
            {formatDate(endDate, { dateFormat: "PP" })}
          </p>
        </div>
      </div>
    </div>
  );
};
