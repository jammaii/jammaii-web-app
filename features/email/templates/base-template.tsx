import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Img
} from '@react-email/components';
import * as React from 'react';
import { Tailwind } from '@react-email/tailwind';

interface BaseTemplateProps {
  previewText: string;
  children: React.ReactNode;
}

export function BaseTemplate({ previewText, children }: BaseTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 py-8">
          <Container className="mx-auto max-w-2xl px-5">
            <Section className="mb-8">
              <Img
                alt="Jammaii Logo"
                className="mx-auto"
                height={100}
                src="https://jammaii-bucket.s3.eu-north-1.amazonaws.com/next-s3-uploads/0857bda8-3d79-46c0-bce0-c18407b77da2/jammaii-logo-2.png"
              />
            </Section>
            <Section className="rounded-lg bg-green-500 p-8 shadow-sm">
              {children}
            </Section>
            <Hr className="my-6 border-gray-200" />
            <Text className="text-center text-xs text-gray-900">
              Jammaii - A Private Real Estate Crowdfunding Platform of Jammaii
              Premium Properties Limited
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

// Reusable Email Components
export function EmailHeading({ children }: { children: React.ReactNode }) {
  return (
    <Text className="m-0 mb-4 text-xl font-semibold text-gray-900">
      {children}
    </Text>
  );
}

export function EmailText({ children }: { children: React.ReactNode }) {
  return <Text className="m-0 mb-6 text-base text-gray-600">{children}</Text>;
}

export function EmailButton({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Section className="text-center">
      <a
        href={href}
        className="inline-block rounded-lg bg-black px-6 py-4 text-sm font-medium text-white no-underline"
      >
        {children}
      </a>
    </Section>
  );
}

export function EmailFootnote({ children }: { children: React.ReactNode }) {
  return <Text className="mt-6 text-sm text-gray-500">{children}</Text>;
}

export function EmailDivider() {
  return <Hr className="my-6 border-gray-200" />;
}
