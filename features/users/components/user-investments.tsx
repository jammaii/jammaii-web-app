import { UserInvestmentResponse } from "@/features/users/types/app";
import { InvestmentDetailsDialog } from "./investment-details-dialog";
import { formatCurrency } from "@/lib/utils";
import { CircleDollarSign } from "lucide-react";
import { ProjectStatus } from "@/features/projects/types/app";

interface UserInvestmentsProps {
  investments: UserInvestmentResponse[];
}

export const UserInvestments = ({ investments }: UserInvestmentsProps) => {
  return (
    <>
      {investments.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          You haven't made any investments yet.
        </div>
      ) : (
        <div className="space-y-4">
          {investments.map((investment) => (
            <InvestmentDetailsDialog
              key={investment.id}
              investment={investment}
            >
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="space-y-1">
                  <p className="font-medium">{investment.project.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CircleDollarSign className="h-4 w-4" />
                    <span>
                      {investment.slots} slots × ₦
                      {formatCurrency(investment.slotPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      ₦{formatCurrency(investment.slots * investment.slotPrice)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Total invested
                    </p>
                  </div>
                  <div>
                    <ProjectStatusBadge status={investment.project.status} />
                  </div>
                </div>
              </div>
            </InvestmentDetailsDialog>
          ))}
        </div>
      )}
    </>
  );
};

const ProjectStatusBadge = ({ status }: { status: ProjectStatus }) => {
  const statusStyles = {
    COMPLETED: "bg-green-100 text-green-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    PENDING: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
        statusStyles[status as keyof typeof statusStyles]
      }`}
    >
      {status}
    </span>
  );
};
