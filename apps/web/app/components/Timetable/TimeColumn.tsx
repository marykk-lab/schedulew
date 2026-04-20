'use client'

import React from 'react';
import { SLOT_HEIGHT } from './TimeSlot';
import { TIME_SLOTS } from './Timetable';

export function TimeColumn() {
  return (
    <div className="w-14 shrink-0 border-r border-border">
      <div className="h-9 border-b border-border" />
      {TIME_SLOTS.map(t => (
        <div
          key={t}
          className="border-b border-border text-[11px] text-text-disabled pr-2 flex items-center justify-end"
          style={{ height: SLOT_HEIGHT }}
        >
          {t.endsWith(':00') ? t : ''}
        </div>
      ))}
    </div>
  );
}
