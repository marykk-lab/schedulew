'use client'

import React from 'react';
import { useViewContext, ViewMode } from '../store/viewStore';

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const SHORT_MONTH = MONTH_NAMES.map(m => m.slice(0, 3));
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const diff = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - diff);
  return d;
}

function formatDateRange(date: Date, mode: ViewMode): string {
  if (mode === 'day') {
    return `${DAY_NAMES[date.getDay()]}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
  }
  if (mode === 'week') {
    const mon = getMondayOfWeek(date);
    const sun = new Date(mon);
    sun.setDate(mon.getDate() + 6);
    const sameYear = mon.getFullYear() === sun.getFullYear();
    const start = `${mon.getDate()} ${SHORT_MONTH[mon.getMonth()]}`;
    const end = `${sun.getDate()} ${SHORT_MONTH[sun.getMonth()]}`;
    return `${start} – ${end}${sameYear ? '' : ` ${mon.getFullYear()}`}, ${sun.getFullYear()}`;
  }
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

const VIEW_MODES: { key: ViewMode; label: string }[] = [
  { key: 'day', label: 'Day' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
];

interface Props {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: Props) {
  const { viewMode, currentDate, setViewMode, goNext, goPrev } = useViewContext();

  return (
    <header className="h-14 border-b border-border bg-toolbar flex items-center px-3 gap-2 shrink-0 md:border md:rounded-xl md:px-5 md:gap-4">
      <button
        onClick={onMenuClick}
        className="md:hidden flex items-center justify-center rounded-md border border-border bg-card text-text-secondary cursor-pointer hover:bg-surface transition-colors duration-150"
        style={{ width: 44, height: 44, fontSize: 20 }}
        aria-label="Open menu"
      >
        ☰
      </button>

      <div className="hidden md:flex w-65 shrink-0 items-center">
        <span className="text-[18px] font-extrabold text-accent tracking-tight">
          Schedule<span className="text-text">W</span>
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center gap-2 md:gap-3">
        <button
          onClick={goPrev}
          className="w-7 h-7 border border-border rounded-md bg-card cursor-pointer text-[18px] leading-none flex items-center justify-center text-text-secondary transition-colors duration-150 hover:bg-surface"
          aria-label="Previous"
        >
          ‹
        </button>
        <span className="text-[13px] md:text-[14px] font-semibold text-text md:min-w-50 text-center whitespace-nowrap">
          {formatDateRange(currentDate, viewMode)}
        </span>
        <button
          onClick={goNext}
          className="w-7 h-7 border border-border rounded-md bg-card cursor-pointer text-[18px] leading-none flex items-center justify-center text-text-secondary transition-colors duration-150 hover:bg-surface"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      <div className="flex gap-0.5 bg-surface rounded-lg p-0.75">
        {VIEW_MODES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setViewMode(key)}
            className={`px-1.5 md:px-3.5 py-1.5 rounded-md border-0 text-[12px] md:text-[13px] font-semibold cursor-pointer transition-all duration-150 ${
              viewMode === key
                ? 'bg-card text-text shadow-sm'
                : 'bg-transparent text-text-secondary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}
