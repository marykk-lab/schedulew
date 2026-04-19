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
  const day = d.getDay(); // 0=Sun
  const diff = (day + 6) % 7;
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

export function Header() {
  const { viewMode, currentDate, setViewMode, goNext, goPrev } = useViewContext();

  return (
    <header
      style={{
        height: 56,
        borderBottom: '1px solid #e5e7eb',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: 16,
        flexShrink: 0,
        color: '#111827',
      }}
    >
      {/* Left: logo */}
      <div style={{ width: 260, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: 18, fontWeight: 800, color: '#2563eb', letterSpacing: '-0.5px' }}>
          Schedule<span style={{ color: '#111827' }}>W</span>
        </span>
      </div>

      {/* Middle: navigation */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <button
          onClick={goPrev}
          style={navBtnStyle}
          aria-label="Previous"
        >
          ‹
        </button>

        <span style={{ fontSize: 14, fontWeight: 600, color: '#111827', minWidth: 200, textAlign: 'center' }}>
          {formatDateRange(currentDate, viewMode)}
        </span>

        <button
          onClick={goNext}
          style={navBtnStyle}
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Right: view mode toggle */}
      <div style={{ display: 'flex', gap: 2, background: '#f3f4f6', borderRadius: 8, padding: 3 }}>
        {VIEW_MODES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setViewMode(key)}
            style={{
              padding: '5px 14px',
              borderRadius: 6,
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              background: viewMode === key ? '#ffffff' : 'transparent',
              color: viewMode === key ? '#111827' : '#6b7280',
              boxShadow: viewMode === key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}

const navBtnStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  border: '1px solid #e5e7eb',
  borderRadius: 6,
  background: '#fff',
  cursor: 'pointer',
  fontSize: 18,
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#374151',
};
