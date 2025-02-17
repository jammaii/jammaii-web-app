/* eslint-disable @typescript-eslint/unbound-method */
'use client';

import 'react-day-picker/dist/style.css';
import { forwardRef, useRef, useState } from 'react';
import { Calendar } from './calendar';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Input, type InputProps } from './input';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { formatDate } from '@/lib/dates';

type OmittedKeys = 'onChange' | 'value' | 'defaultValue';

export interface DatePickerProps extends Omit<InputProps, OmittedKeys> {
  defaultValue?: Date;
  value?: Date;
  from?: Date;
  to?: Date;
  /**
   * Iconless can be interesting for scenarios where you don't want the calendar itself,
   * but only the date input, for example for dates far in the past.
   */
  iconless?: boolean;
  onChange(date: Date): void;
  onDateError?(message?: string): void;
}

/**
 * I didn't really kill myself working or overriding this calendar input, here is a github gist
 * that explains the whole thought process and how we arrived at this.
 *
 * I think this component can strongly be improved, currently it works great but uses native select vs a styled select.
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => {
    const {
      defaultValue,
      onChange,
      value,
      onDateError,
      from,
      to,
      iconless,
      ...rest
    } = props;
    const [opened, setOpened] = useState(false);
    const [stringDate, setStringDate] = useState(
      defaultValue ? formatDate(defaultValue, { dateFormat: 'MM/dd/yyyy' }) : ''
    );
    const [errorMessage, setErrorMessage] = useState<string>();
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleError = (message?: string) => {
      return onDateError ? onDateError(message) : setErrorMessage(message);
    };

    return (
      <Popover key={value?.getDate()} open={opened} onOpenChange={setOpened}>
        <div ref={wrapperRef} className="relative w-full">
          <Input
            {...rest}
            ref={ref}
            // Disable auto suggest for input: https://stackoverflow.com/questions/35448269/angular-materials-can-you-disable-the-autocomplete-suggestions-for-an-input/60335213#60335213
            name={props.name ?? 'date-picker'}
            type="text"
            value={stringDate}
            placeholder="MM/DD/YYYY"
            autoComplete="off"
            onFocus={() => {
              if (value)
                setStringDate(formatDate(value, { dateFormat: 'MM/dd/yyyy' }));
            }}
            onChange={(e) => {
              if (value) setStringDate('');
              setStringDate(e.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value) {
                const parsedDate = new Date(e.target.value);
                if (parsedDate.toString() === 'Invalid Date') {
                  handleError('Invalid Date');
                } else {
                  handleError();
                  onChange(parsedDate);
                  setStringDate(
                    formatDate(parsedDate, { dateFormat: 'MM/dd/yyyy' })
                  );
                }
              }
            }}
          />
          {!onDateError && errorMessage !== '' && (
            <div className="absolute -bottom-6 left-0 text-sm text-destructive">
              {errorMessage}
            </div>
          )}
          {!iconless && (
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'absolute right-0 top-[50%] translate-y-[-50%] rounded-md rounded-l-none font-normal',
                  !value && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
          )}
        </div>
        <PopoverContent align="end" className="w-fit p-0">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={value}
            defaultMonth={value}
            fromDate={from}
            toDate={to}
            classNames={{
              caption_label: 'flex items-center text-sm font-medium',
              dropdown: 'rdp-dropdown bg-card',
              dropdown_icon: 'ml-2',
              dropdown_year: 'rdp-dropdown_year ml-3',
              button: '',
              button_reset: '',
              head_row: 'flex justify-between',
              row: 'flex justify-between mt-2',
              month: 'w-full space-y-4'
            }}
            onSelect={(selectedDate) => {
              if (!selectedDate) return;
              onChange(selectedDate);
              setStringDate(
                formatDate(selectedDate, { dateFormat: 'MM/dd/yyyy' })
              );
              handleError();
              setOpened(false);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = 'DatePicker';
