import { authPageParamsSchema } from "~/features/auth/schema";
import { discoverUrlSchema } from "~/features/discovery/types";
import {
  discoverCategorySchema,
  morePostsUrlSchema,
  singleFeedSchema,
} from "~/features/feed/posts/types/app";
import {
  invitePageUrlSchema,
  resetPasswordPageUrlSchema,
} from "~/features/invite/types/app";
import { moderationAgencyPageUrlSchema } from "~/features/moderation/agency/types/app";
import { payoutExportUrlSchema } from "~/features/moderation/payouts/types/app";
import { moderationUsersPageUrlSchema } from "~/features/moderation/users/types/app";
import {
  returnPageUrlSchema,
  paymentOriginUrlSchema,
} from "~/features/payments/types/app";
import { proxyPageUrlSchema } from "~/features/proxy/types/app";
import { usernameParamsUrlSchema } from "~/features/user-info/types/app";

/**
 * Contains pages and the corresponding schema for validating url parameters of the page. The schema should be defined as an object containing the url params and query as seperate objects. e.g `/pets/{id}?type=dog}` should have a schema as
 * ```json
 * {
 *     params: {id: stringValidation},
 *     query: {type: petTypeValidation}
 * }
 * ```
 * @see singleFeedSchema
 */
export const urlParamsSchemaStore = {
  singleFeedPage: singleFeedSchema,
  discoverCategoryPage: discoverCategorySchema,
  authPage: authPageParamsSchema,
  morePostsComponent: morePostsUrlSchema,
  discoverPage: discoverUrlSchema,
  paymentsReturnPage: returnPageUrlSchema,
  resetPasswordPage: resetPasswordPageUrlSchema,
  invitePage: invitePageUrlSchema,
  proxyPage: proxyPageUrlSchema,
  usernameParamsPage: usernameParamsUrlSchema,
  payoutExportPage: payoutExportUrlSchema,
  moderationAgencyPage: moderationAgencyPageUrlSchema,
  moderationUsersPage: moderationUsersPageUrlSchema,
  paymentOrigin: paymentOriginUrlSchema,
} as const;
