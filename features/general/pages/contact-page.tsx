"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneralWrapper } from "@/features/general/components/general-wrapper";
import { ContactSection } from "@/features/general/components/contact-section";
import { AtSignIcon, Mail, Phone } from "lucide-react";

export const ContactPage = () => {
  const phoneNumber = "+2341234567890"; // Remove spaces for WhatsApp link
  const emailAddress = "info@jammaii.com";

  return (
    <GeneralWrapper>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Contact Us
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ContactSection />
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <a
                href={`mailto:${emailAddress}`}
                className="text-primary hover:underline"
              >
                {emailAddress}
              </a>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <a
                href={`tel:${phoneNumber}`}
                className="text-primary hover:underline"
              >
                {phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
              </a>
            </div>

            <div className="flex items-center justify-center gap-2">
              <AtSignIcon className="h-5 w-5 text-green-500" />
              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </GeneralWrapper>
  );
};
