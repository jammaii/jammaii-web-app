"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneralWrapper } from "@/features/general/components/general-wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
            <AccordionTrigger>How do I invest?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What happens if i want to withdraw my money before the due date?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </GeneralWrapper>
  );
};
