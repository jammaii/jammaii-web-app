'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GeneralWrapper } from '@/features/general/components/general-wrapper';

export const VisionMissionPage = () => {
  return (
    <GeneralWrapper>
      <Card>
        <CardHeader>
          <CardTitle>Vision and Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold">Vision</h2>
              <p>
                Because real estate is a key determinant of tomorrow, every
                dispensation and civilization, our mission is simply providing
                financial solutions to individuals, families, corporate and
                government institutions through real estate activities.
              </p>
            </section>
          </div>
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold">Mission</h2>
              <p>
                Our vision is to create global financial solutions through real
                estate activities that will make our community members,
                customers, investors and us (Jammaii Inc) a Forbes’ recognized
                money.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </GeneralWrapper>
  );
};
