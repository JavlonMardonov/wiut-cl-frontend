import {
  startOfWeek,
  endOfWeek,
  subDays,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const today = new Date();

export const dateRanges = [
  { label: "Today", start: today, end: today },
  {
    label: "Yesterday",
    start: subDays(today, 1),
    end: subDays(today, 1),
  },
  {
    label: "This Week",
    start: startOfWeek(today, { weekStartsOn: 1 }),
    end: endOfWeek(today, { weekStartsOn: 1 }),
  },
  {
    label: "Last Week",
    start: subDays(startOfWeek(today, { weekStartsOn: 1 }), 7),
    end: subDays(endOfWeek(today, { weekStartsOn: 1 }), 7),
  },
  { label: "Last 7 Days", start: subDays(today, 6), end: today },
  {
    label: "This Month",
    start: startOfMonth(today),
    end: endOfMonth(today),
  },
  {
    label: "Last Month",
    start: startOfMonth(subDays(today, today.getDate())),
    end: endOfMonth(subDays(today, today.getDate())),
  },
  { label: "This Year", start: startOfYear(today), end: endOfYear(today) },
  {
    label: "Last Year",
    start: startOfYear(subDays(today, 365)),
    end: endOfYear(subDays(today, 365)),
  },
];
