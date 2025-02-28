import * as React from "react";
import {
  BaseTemplate,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailFootnote,
} from "./base-template";

interface SigninEmailTemplateProps {
  url: string;
}

export function SigninEmailTemplate({ url }: SigninEmailTemplateProps) {
  return (
    <BaseTemplate previewText="Sign in to your JAMMAII account">
      <EmailHeading>Sign in to JAMMAII</EmailHeading>
      <EmailText>Click the button below to sign in to your account.</EmailText>
      <EmailButton href={url}>Sign in to JAMMAII</EmailButton>
      <EmailFootnote>
        If you didn't request this email, you can safely ignore it.
      </EmailFootnote>
    </BaseTemplate>
  );
}
