import * as React from 'react';
import {
  BaseTemplate,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailFootnote,
  EmailDivider
} from './base-template';

interface InvestmentConfirmationTemplateProps {
  name: string;
  projectName: string;
  slots: number;
  totalAmount: number;
  transactionReference: string;
  investmentstUrl: string;
}

export function InvestmentConfirmationTemplate({
  name,
  projectName,
  slots,
  totalAmount,
  transactionReference,
  investmentstUrl
}: InvestmentConfirmationTemplateProps) {
  return (
    <BaseTemplate previewText={`Investment Confirmation - ${projectName}`}>
      <EmailHeading>Crowdfunding Successful!</EmailHeading>

      <EmailText>Congratulations {name},</EmailText>

      <EmailText>
        Your slot acquisition in {projectName} is successfully processed. Here
        are your transaction details:
      </EmailText>

      <div
        style={{
          padding: '16px',
          margin: '24px 0',
          borderRadius: '8px',
          backgroundColor: '#f9fafb'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px 0' }}>Project:</td>
              <td
                style={{
                  padding: '8px 0',
                  textAlign: 'right',
                  fontWeight: 'bold'
                }}
              >
                {projectName}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>Number of Slots:</td>
              <td
                style={{
                  padding: '8px 0',
                  textAlign: 'right',
                  fontWeight: 'bold'
                }}
              >
                {slots}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>Total Amount:</td>
              <td
                style={{
                  padding: '8px 0',
                  textAlign: 'right',
                  fontWeight: 'bold'
                }}
              >
                ₦{totalAmount.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>Transaction Reference:</td>
              <td
                style={{
                  padding: '8px 0',
                  textAlign: 'right',
                  fontFamily: 'monospace'
                }}
              >
                {transactionReference}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmailButton href={investmentstUrl}>Project Information</EmailButton>

      <EmailDivider />

      <EmailText>
        Thank you for crowdfunding with Jammaii. You can track your asset
        progress on your dashboard.
      </EmailText>

      <EmailFootnote>
        For any questions about your crowdfunding asset, kindly contact
        support@jammaii.com with your transaction reference.
      </EmailFootnote>
    </BaseTemplate>
  );
}
