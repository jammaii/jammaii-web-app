"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneralWrapper } from "@/features/general/components/general-wrapper";
import { cn } from "@/lib/utils";
import { id } from "date-fns/locale";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: `Welcome to Jammaii Premium Investments Limited (JPIL), a platform dedicated to connecting affiliate developers ("Investors") with real estate developments ("Investment") through crowdfunding. By accessing and/or using our platform (the "Service"), you agree to comply with the following Terms of Service ("Terms"). Please read these Terms carefully before accessing or using our Service.\n
    Last updated: 1st March, 2025`,
  },
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using JPIL (the "Platform"), you agree to be bound by these Terms and any applicable laws, regulations, and guidelines which are incorporated by reference. If you do not agree to these Terms, you must refrain from using the Platform.`,
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    content: `To use our platform, you must be at least 18 years of age and legally able to form a binding contract. By using the Platform, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into a contract. You also must not be prohibited by law from engaging in real estate investments or crowdfunding in your jurisdiction.`,
  },
  {
    id: "platform-use",
    title: "3. Platform Use",
    content: `- Account Registration: In order to access/ use certain features and services of the Platform, you may be required to create an account. You agree to provide accurate, current, complete, and up-to-date information when registering your account and to update such information as necessary. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. \n
    - Affiliate Developer Eligibility: Affiliate Developer may only participate in projects that meet regulatory requirements, and must acknowledge that they are qualified to invest based on their financial situation and risk tolerance.`,
  },
  {
    id: "platform-services",
    title: "4. Platform Services",
    content: `JPIL allows users to:
    - Create Account: Users can create accounts to be able to have access to our private crowdfunding community \n
    - Buy Slots: Users can buy into our crowdfunded projects through slots acquisitions and automatically become a member of our affiliate developers community.\n
    - Withdraw and Receive Funds: Users can cancel their community membership as spelt out in our contract documents when buying into our slots, and can also wait and receive theit full renumeration at the end of a development cycle as also stipulated in the contract documents before buying into our slots.`,
  },
  {
    id: "investment-opportunities",
    title: "5. Investment Opportunities",
    content: `– Crowdfunding Projects: JPIL may provide users with access to various real estate investment opportunities, including equity and debt-based investments.\n
    – Investment Risk: All investments carry risk, and you acknowledge that past performance is not indicative of future results. You should seek advice from a financial professional before making any investment decisions.\n
    – Investment Process: Each investment opportunity will have its own terms, including the minimum investment amount, expected returns, and investment timeline. By committing to an investment, you agree to these terms.`,
  },
  {
    id: "fees",
    title: "6. Fees and Charges",
    content: `JPIL may charge fees for using our platform, including for certain services such as processing investments or providing additional features. The fee structure will be clearly outlined for each service. You agree to pay all applicable fees associated with your use of the Platform.`,
  },
  {
    id: "payment-processing",
    title: "7. Payment Processing",
    content: `All payments made on the Platform are processed through third-party payment processors. By using the Platform, you agree to comply with the payment processor's terms and conditions.\n

    – JPIL will receive funds raised minus any applicable fees such as transaction charges that go to the third party payment processors.\n

    – Affiliate Developer (User) is responsible for ensuring they provide accurate payment details for their due reimbursements as at when updating their account.`,
  },
  {
    id: "user-responsibility",
    title: "8. User Responsibilities",
    content: `As a user of the Platform, you agree to:
    – Provide accurate and truthful information during account registration, investment creation and profile or portal updating. JPIL or its affiliate is not liable for any losses incurred due to inaccurate data.\n

    – Be responsible for maintaining the accuracy of your registration and investment information.\n

    – Respect the rights and privacy of other users.\n

    – Not use the Platform to harass, abuse, or intimidate others.\n

    – Compliance with Laws: You agree to comply with all applicable laws, regulations, and legal obligations relating to your use of the platform and your investments.`,
  },
  {
    id: "intellectual-property",
    title: "9. Intellectual Property",
    content: `All content on the Platform, including text, graphics, logos, and other materials, is the property of JPIL or its licensors and is protected by intellectual property laws. You may not copy, modify, or distribute such content without permission.`,
  },
  {
    id: "privacy-policy",
    title: "10. Privacy & Data Protection Policy",
    content: `– Your use of the Platform is governed by our Privacy Policy, which can be found on our privacy page. By using the Platform, you consent to the collection, use, and disclosure of your personal information as described in the Privacy Policy.\n

    – Data Sharing: We may share your information with third-party partners and service providers in accordance with our Privacy Policy and legal obligations.`,
  },
  {
    id: "termination",
    title: "11. Termination",
    content: `– Account Suspension/Termination: We may suspend or terminate your access to the platform at any time for any reason, including violation of these Terms with or without notice. Upon termination, you will no longer have access to your account or any project you committed to.\n

    – User Withdrawal:  You can withdraw from the platform or stop using our services at any time, but withdrawal from active investments will be subject to specific terms and conditions of each opportunity.`,
  },
  {
    id: "disclaimer",
    title: "12. Disclaimers & Limitation of Liability",
    content: `– No Financial Advice: The platform is not intended to provide investment advice, and no content should be construed as financial advice.\n

    – To the fullest or maximum extent permitted by law, JPIL and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of the Platform, participation in crowdfunding investments or reliance on any information provided. In no event shall our liability exceed the amount you have paid to us for the specific service at issue.`,
  },
  {
    id: "platform-limitations",
    title: "13. Platform Limitations and Availability",
    content: `Platform Downtime: We strive to maintain the platform’s availability, but we are not liable for any interruptions, downtime, or loss of access to the platform.`,
  },
  {
    id: "indemnification",
    title: "14. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless JPIL, its affiliates, officers, employees, and agents from any claims, damages, liabilities, or expenses (including legal fees) arising from your use of the Platform, your investments, your breach of these Terms, or any violation of applicable Terms.`,
  },
  {
    id: "amendments",
    title: "15. Amendments to Terms",
    content: `We reserve the right to update or modify these Terms at any time. You will be notified of any material changes posted on this page with an updated date, and your continued use of the Platform after such changes constitutes your acceptance of the revised Terms.`,
  },
  {
    id: "governing-law",
    title: "16. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of Federal Republic of Nigeria, without regard to its conflict of law principles. Any dispute arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts in Lagos, Nigeria.`,
  },
  {
    id: "dispute-resolution",
    title: "17. Dispute Resolution",
    content: `In the event of a dispute, you agree to attempt to resolve the issue through informal negotiations. If a resolution cannot be reached, you agree to resolve the dispute through binding arbitration in accordance with the laws of the Nigerian Arbitration Act.`,
  },
];

const TableOfContents = () => (
  <nav className="mb-8 space-y-1 rounded-lg bg-muted p-4">
    <h3 className="mb-2 font-semibold">Table of Contents</h3>
    {sections.map((section) => (
      <a
        key={section.id}
        href={`#${section.id}`}
        className="block text-sm text-muted-foreground hover:text-primary"
      >
        {section.title}
      </a>
    ))}
  </nav>
);

export const TermsPage = () => {
  return (
    <GeneralWrapper>
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Terms and Legal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TableOfContents />
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-20"
              >
                <h2 className="mb-4 text-xl font-semibold">{section.title}</h2>
                {section.content.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className={cn(
                      "leading-relaxed text-muted-foreground",
                      index > 0 && "mt-4",
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <section id="contact" className="scroll-mt-20">
              <h2 className="mb-4 text-xl font-semibold">
                Contact Information
              </h2>
              <div className="space-y-2">
                <p>
                  If you have any questions or concerns regarding these Terms,
                  please contact us at:
                </p>
                <div className="space-y-1 pl-4">
                  <p>JPIL</p>
                  <p>Email: support@jammaii.com</p>
                  <p>Call/Chat: 07062666957</p>
                  <p>Location: Lagos, Nigeria</p>
                </div>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </GeneralWrapper>
  );
};
