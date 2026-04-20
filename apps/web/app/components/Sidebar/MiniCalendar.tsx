'use client'

import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useViewContext } from '../../store/viewStore';

function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - (d.getDay() + 6) % 7);
  return d;
}

export function MiniCalendar() {
  const { currentDate, setCurrentDate, viewMode } = useViewContext();

  const monday = getMondayOfWeek(currentDate);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const modifiers =
    viewMode === 'week'
      ? { weekRange: { from: monday, to: sunday } }
      : {};

  const modifiersStyles = {
    weekRange: { background: 'rgba(168, 151, 122, 0.15)', borderRadius: 0 } as React.CSSProperties,
  };

  return (
    <div className="mini-calendar">
      <DayPicker
        mode="single"
        selected={currentDate}
        onSelect={date => date && setCurrentDate(date)}
        weekStartsOn={1}
        showOutsideDays
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
      />
      <style>{`
        .mini-calendar .rdp-root {
          --rdp-accent-color: #a8977a;
          --rdp-accent-background-color: rgba(168, 151, 122, 0.15);
          font-size: 12px;
          width: 100%;
          color: #f0e8d6;
        }
        .mini-calendar .rdp-month_grid {
          width: 100%;
        }
        .mini-calendar .rdp-day_button {
          width: 28px;
          height: 28px;
          font-size: 11px;
        }
        .mini-calendar .rdp-weekday {
          font-size: 10px;
          color: #5e5548;
          font-weight: 600;
        }
        .mini-calendar .rdp-caption_label {
          font-size: 13px;
          font-weight: 700;
          color: #f0e8d6;
        }
        .mini-calendar .rdp-nav button {
          color: #8a7f6a;
        }
        .mini-calendar .rdp-outside {
          color: #5e5548;
        }
      `}</style>
    </div>
  );
}
