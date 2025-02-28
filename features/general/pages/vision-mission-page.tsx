"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneralWrapper } from "@/features/general/components/general-wrapper";

export const VisionMissionPage = () => {
  return (
    <GeneralWrapper>
      <Card>
        <CardHeader>
          <CardTitle>Vision and Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold">Vision</h2>
              <p>This should contain details about the company vision</p>
            </section>
          </div>
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold">Mission</h2>
              <p>This should contain details about the company mission</p>
            </section>
          </div>
        </CardContent>
      </Card>
    </GeneralWrapper>
  );
};
