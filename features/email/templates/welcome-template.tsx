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
      <EmailHeading>Hello {name}, Welcome to Jammaii!</EmailHeading>
      <EmailText>
        Your favorite Real Estate Crowdfunding Platform. We're excited to have
        you on board.
      </EmailText>
      <EmailText>Get started by exploring our platform</EmailText>
      <EmailButton href={dashboardUrl}>Your Dashboard</EmailButton>
      <EmailFootnote>
        Need help? Contact support@jammaii.com and we'll be happy to assist
      </EmailFootnote>
    </BaseTemplate>
  );
}
