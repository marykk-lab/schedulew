'use client'

import React from 'react';
import { SLOT_HEIGHT } from './TimeSlot';
import { TIME_SLOTS } from './Timetable';

export function TimeColumn() {
  return (
    <div style={{ width: 56, flexShrink: 0, borderRight: '1px solid #e5e7eb' }}>
      <div style={{ height: 36, borderBottom: '1px solid #e5e7eb' }} />
      {TIME_SLOTS.map(t => (
        <div
          key={t}
          style={{
            height: SLOT_HEIGHT,
            borderBottom: '1px solid #f3f4f6',
            fontSize: 11,
            color: '#9ca3af',
            paddingRight: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          {t.endsWith(':00') ? t : ''}
        </div>
      ))}
    </div>
  );
}
