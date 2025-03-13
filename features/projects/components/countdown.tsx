'use client';

import { formatDate } from '@/lib/dates';
import { Separator } from '@radix-ui/react-dropdown-menu';

// @ts-ignore - package probably don't support ts.
import FlipCountdown from '@rumess/react-flip-countdown';

export const Countdown = ({ startDate }: { startDate: Date }) => {
  return (
    <div>
      <Separator />
      <h1 className="text-2xl text-center">Countdown to end of crowdfunding</h1>

      <FlipCountdown
        endAtZero
        size="small"
        theme="light"
        hideYear
        monthTitle="Months"
        dayTitle="Days"
        hourTitle="Hours"
        minuteTitle="Minutes"
        secondTitle="Seconds"
        endAt={formatDate(startDate, { dateFormat: 'yyyy-MM-dd HH:mm:ss' })} // Date/Time
      />
    </div>
  );
};
