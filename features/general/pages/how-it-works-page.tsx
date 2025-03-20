'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GeneralWrapper } from '@/features/general/components/general-wrapper';
import { HowItWorksSection } from '@/features/general/components/how-it-works-section';

export const HowItWorksPage = () => {
  return (
    <GeneralWrapper>
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <HowItWorksSection />
        </CardContent>
      </Card>
    </GeneralWrapper>
  );
};
