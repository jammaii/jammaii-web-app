import { accountSchema } from "./schemas/auth/account.schema";
import { userRoleSchema } from "./schemas/auth/enums/user-roles";
import { sessionSchema } from "./schemas/auth/session.schema";
import { userSchema } from "./schemas/auth/user.schema";
import { verificationTokenSchema } from "./schemas/auth/verification-table.schema";
import { paymentProviderSchema } from "./schemas/project/enums/payment-provider.schema";
import { projectStatusSchema } from "./schemas/project/enums/project-status.schema";
import { transactionStatusSchema } from "./schemas/project/enums/transaction-status.schema";
import { projectSchema } from "./schemas/project/project.schema";
import { supportMessageSchema } from "./schemas/project/support-message.schema";
import { userInvestmentSchema } from "./schemas/project/user-investment.schema";

// Auth
export const user = userSchema;
export const account = accountSchema;
export const verificationToken = verificationTokenSchema;
export const session = sessionSchema;
export const userRole = userRoleSchema;

// Project
export const project = projectSchema;
export const projectStatus = projectStatusSchema;

// User investments
export const userInvestment = userInvestmentSchema;
export const transactionStatus = transactionStatusSchema;
export const paymentProvider = paymentProviderSchema;

// Support
export const supportMessage = supportMessageSchema;
