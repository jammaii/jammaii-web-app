'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GeneralWrapper } from '@/features/general/components/general-wrapper';

export const AboutPage = () => {
  return (
    <GeneralWrapper>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            About Us
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section className="space-y-6">
              <div>
                <h2 className="mb-4 text-xl font-semibold">Who We Are</h2>
                <p className="leading-relaxed">
                  Jammaii Premium Investments Limited (RC: 1903462), trading as
                  Jammaii Premium Properties Limited is a cutting edge real
                  estate and infrastructure development company operating at the
                  forefront of the property development industry, offering high
                  quality real estate services and advisory in Nigeria.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-semibold">Our Experience</h2>
                <p className="leading-relaxed">
                  In our years of existence and experience, we have delivered
                  functional and premium real estate solutions, spearheaded
                  simple and complex transactions with our team of expertise.
                  Our spectrum of investment solutions encompass joint ventures,
                  renovation, property and infrastructure developments,
                  acquisitions and disposals, build operate and transfer
                  agreement with private and public institutions.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-semibold">Our Team</h2>
                <p className="leading-relaxed">
                  Our team of real estate enthusiasts are dedicated to keenness
                  to detail, possess extensive market knowledge, and will always
                  skillfully negotiate favorable terms for our customers. JPIL
                  is FIRS & EFCC certified.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-semibold">JREIT Program</h2>
                <p className="leading-relaxed">
                  JREIT is a private real estate crowdfunding community
                  pioneered by JPIL to foster property developments across
                  Nigerian cities. A community of real estate affiliate
                  developers (investors) crowdfunding property developments
                  across major Nigerian cities using collective resources and
                  sharing profits.
                </p>
                <p className="mt-4 leading-relaxed">
                  The community crowdfunds the entire process from Land
                  Acquisition, surveys & documentation, government
                  permits/approvals and subsequent development (building on the
                  land) while Jammaii Premium Properties Limited
                  administered/supervises the property development and sales
                  alongside community leadership.
                </p>
                <p className="mt-4 leading-relaxed">
                  Members of the community have unrestricted access to project
                  sites to inspect progress.
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Download Brochure
                </a>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </GeneralWrapper>
  );
};
