'use client'

import React from 'react';
import { DayOfWeek } from '../../types/types';
import { useViewContext } from '../../store/viewStore';
import { TimeColumn } from './TimeColumn';
import { DayColumn } from './DayColumn';
import { MonthView } from './MonthView';

export const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const TIME_SLOTS: string[] = (() => {
  const slots: string[] = [];
  for (let h = 8; h < 20; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
})();

function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - (d.getDay() + 6) % 7);
  return d;
}

export function Timetable() {
  const { viewMode, currentDate } = useViewContext();

  if (viewMode === 'month') {
    return <MonthView />;
  }

  const monday = getMondayOfWeek(currentDate);

  const visibleDays: { day: DayOfWeek; date: Date }[] = DAYS.map((day, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { day, date: d };
  });

  const dayColumns = viewMode === 'day'
    ? [visibleDays[(currentDate.getDay() + 6) % 7]!]
    : visibleDays;

  return (
    <div className="flex overflow-auto flex-1">
      <TimeColumn />
      {dayColumns.map(({ day, date }) => (
        <DayColumn key={day} day={day} date={date} />
      ))}
    </div>
  );
}
