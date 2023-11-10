import { I18N } from '~/utils/config';

const formatter: Intl.DateTimeFormat =
  I18N?.dateFormatter ||
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

export const getFormattedDate = (date: Date): string => (date ? formatter.format(date) : '');

export const trim = (str?: string, ch?: string) => {
  const base = str ?? '';

  let start = 0;
  let end = base.length || 0;
  while (start < end && base[start] === ch) start += 1;
  while (end > start && base[end - 1] === ch) end -= 1;
  return start > 0 || end < base.length ? base.substring(start, end) : base;
};

// Function to format a number in thousands (K) or millions (M) format depending on its value
export const toUiAmount = (amount: number) => {
  if (!amount) return 0;

  let value: string;

  if (amount >= 1000000000) {
    const formattedNumber = (amount / 1000000000).toFixed(1);

    if (Number(formattedNumber) === Number.parseInt(formattedNumber, 10)) {
      value = `${Number.parseInt(formattedNumber, 10)}B`;
    } else {
      value = `${formattedNumber}B`;
    }
  } else if (amount >= 1000000) {
    const formattedNumber = (amount / 1000000).toFixed(1);
    if (Number(formattedNumber) === Number.parseInt(formattedNumber, 10)) {
      value = `${Number.parseInt(formattedNumber, 10)}M`;
    } else {
      value = `${formattedNumber}M`;
    }
  } else if (amount >= 1000) {
    const formattedNumber = (amount / 1000).toFixed(1);
    if (Number(formattedNumber) === Number.parseInt(formattedNumber, 10)) {
      value = `${Number.parseInt(formattedNumber, 10)}K`;
    } else {
      value = `${formattedNumber}K`;
    }
  } else {
    value = Number(amount).toFixed(0);
  }

  return value;
};
