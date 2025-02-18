'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GeneralWrapper } from '@/features/general/components/general-wrapper';

export const AboutPage = () => {
  return (
    <GeneralWrapper>
      <Card>
        <CardHeader>
          <CardTitle>About Us</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold">Introduction</h2>
              <p>This should contain details about the team</p>
            </section>
          </div>
        </CardContent>
      </Card>
    </GeneralWrapper>
  );
};
