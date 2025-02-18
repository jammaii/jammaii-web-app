'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GeneralWrapper } from '@/features/general/components/general-wrapper';
import { ContactSection } from '@/features/general/components/contact-section';

export const ContactPage = () => {
  return (
    <GeneralWrapper>
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactSection />
        </CardContent>
      </Card>
    </GeneralWrapper>
  );
};
