'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GeneralWrapper } from '@/features/general/components/general-wrapper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export const FaqPage = () => {
  return (
    <GeneralWrapper>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <p>Here are some frequently asked questions</p>
            </section>
          </div>
        </CardContent>

        <Accordion type="single" collapsible className="w-full p-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I buy an assett?</AccordionTrigger>
            <AccordionContent>
              You can buy an asset by buying a slot in a project.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What happens if i want to withdraw my money before the due date?
            </AccordionTrigger>
            <AccordionContent>
              You might lose your interest if you withdraw your money before the
              due date.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </GeneralWrapper>
  );
};
