"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneralWrapper } from "@/features/general/components/general-wrapper";

export const PrivacyPolicyPage = () => {
  return (
    <GeneralWrapper>
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold">Introduction</h2>
              <p>
                At JAMMAII, we take your privacy seriously. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you visit our website or use our real estate
                investment platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Information We Collect</h2>
              <h3 className="text-xl font-medium">Personal Information</h3>
              <ul className="list-disc pl-6">
                <li>Name and contact details</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing and payment information</li>
                <li>Investment preferences and history</li>
                <li>Government-issued identification</li>
              </ul>

              <h3 className="mt-4 text-xl font-medium">Usage Information</h3>
              <ul className="list-disc pl-6">
                <li>Browser and device information</li>
                <li>IP address and location data</li>
                <li>Pages viewed and interactions</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6">
                <li>Process your investments and transactions</li>
                <li>Verify your identity and prevent fraud</li>
                <li>Send important updates about your investments</li>
                <li>Improve our services and user experience</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Communicate about new opportunities and features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Information Sharing</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6">
                <li>Service providers and business partners</li>
                <li>Financial institutions and payment processors</li>
                <li>Legal and regulatory authorities</li>
                <li>Professional advisors and consultants</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Security Measures</h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage and transmission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our
                practices, please contact us at:
              </p>
              <div className="mt-2">
                <p>Email: privacy@jammaii.com</p>
                <p>Phone: +234 123 456 7890</p>
                <p>Address: 123 Investment Street, Lagos, Nigeria</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The updated
                version will be indicated by an updated "Last Updated" date and
                the updated version will be effective as soon as it is
                accessible.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Last Updated: February 17, 2025
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </GeneralWrapper>
  );
};
