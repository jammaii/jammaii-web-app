"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneralWrapper } from "@/features/general/components/general-wrapper";

export const HowItWorksPage = () => {
  return (
    <GeneralWrapper>
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold">Introduction</h2>
              <p>How it works details here</p>
            </section>
          </div>
        </CardContent>
      </Card>
    </GeneralWrapper>
  );
};
