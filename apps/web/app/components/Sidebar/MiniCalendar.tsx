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
    weekRange: { background: '#eff6ff', borderRadius: 0 } as React.CSSProperties,
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
          --rdp-accent-color: #2563eb;
          --rdp-accent-background-color: #eff6ff;
          font-size: 12px;
          width: 100%;
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
          color: #9ca3af;
          font-weight: 600;
        }
        .mini-calendar .rdp-caption_label {
          font-size: 13px;
          font-weight: 700;
          color: #111827;
        }
        .mini-calendar .rdp-nav button {
          color: #6b7280;
        }
        .mini-calendar .rdp-outside {
          color: #d1d5db;
        }
      `}</style>
    </div>
  );
}
