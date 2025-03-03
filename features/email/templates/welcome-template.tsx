import * as React from 'react';
import {
  BaseTemplate,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailFootnote
} from './base-template';

interface WelcomeEmailTemplateProps {
  name: string;
  dashboardUrl: string;
}

export function WelcomeEmailTemplate({
  name,
  dashboardUrl
}: WelcomeEmailTemplateProps) {
  return (
    <BaseTemplate previewText="Welcome to JAMMAII">
      <EmailHeading>Welcome to Jammaii, {name}!</EmailHeading>
      <EmailText>
        We're excited to have you on board. Get started by exploring our
        platform.
      </EmailText>
      <EmailButton href={dashboardUrl}>View Dashboard</EmailButton>
      <EmailFootnote>
        Need help? Reply to this email and we'll be happy to assist.
      </EmailFootnote>
    </BaseTemplate>
  );
}
