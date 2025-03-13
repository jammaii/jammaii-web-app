'use client';

import { useState } from 'react';
import { AboutForm } from '@/features/projects/components/create/about-form';
import { MediaForm } from '@/features/projects/components/create/media-form';
import { InvestmentForm } from '@/features/projects/components/create/investment-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Preview } from '@/features/projects/components/create/preview';
import {
  CreateFormDto,
  CreateProjectPreview,
  PropertyDetailsRequestDto,
  PropertyInvestmentRequestDto,
  PropertyMediaPreview
} from '@/features/projects/types/app';
import {
  isPropertyDetails,
  isPropertyInvestment,
  isPropertyPreviewMedia
} from '@/features/projects/types/guards';

const STEPS = [
  {
    id: 'about',
    title: 'About Project',
    component: AboutForm
  },
  {
    id: 'media',
    title: 'Media',
    component: MediaForm
  },
  {
    id: 'investment',
    title: 'Investment Details',
    component: InvestmentForm
  },
  {
    id: 'preview',
    title: 'Preview',
    component: Preview
  }
] as const;

export const CreateProjectPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [propertyDetails, setPropertyDetails] =
    useState<PropertyDetailsRequestDto | null>();
  const [mediaDetails, setMediaDetails] =
    useState<PropertyMediaPreview | null>();
  const [investmentDetails, setInvestmentDetails] =
    useState<PropertyInvestmentRequestDto | null>();
  const [previewData, setPreviewData] = useState<CreateProjectPreview | null>(
    null
  );

  const Step = STEPS[currentStep].component;

  const next = (data: CreateFormDto) => {
    if (isPropertyDetails(data)) {
      setPropertyDetails(data);
    } else if (isPropertyPreviewMedia(data)) {
      setMediaDetails(data);
    } else if (isPropertyInvestment(data)) {
      setInvestmentDetails(data);

      // If all forms are complete, set the preview data
      if (propertyDetails && mediaDetails) {
        setPreviewData({
          propertyDetails: propertyDetails,
          mediaDetails: mediaDetails,
          investmentDetails: data
        });
      }
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((current) => current + 1);
    }
  };

  const back = () => {
    if (currentStep > 0) {
      setCurrentStep((current) => current - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Progress indicator */}
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  index !== STEPS.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    currentStep >= index
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted'
                  }`}
                >
                  {index + 1}
                </div>
                {index !== STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 ${
                      currentStep > index ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form step */}
          <Step
            disablePreviousStep={currentStep === 0}
            showNextStep={currentStep !== STEPS.length - 2}
            previewData={previewData}
            backAction={back}
            onCompleteAction={next}
          />

          {/* Navigation */}
          {/* <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={back}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            {currentStep !== STEPS.length - 1 && (
              <Button type="submit" form={STEPS[currentStep].id}>
                Next
              </Button>
            )}
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};
