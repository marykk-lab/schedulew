'use client'

import React from 'react';
import { useViewContext } from '../../store/viewStore';
import { useScheduleContext } from '../../store/scheduleStore';
const DAY_HEADERS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export function MonthView() {
  const { currentDate, setCurrentDate, setViewMode } = useViewContext();
  const { scheduledItems, activities } = useScheduleContext();
  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  function handleDayClick(date: Date) {
    setCurrentDate(date);
    setViewMode('day');
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', color: '#111827' }}>
      {/* Day-of-week header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #e5e7eb' }}>
        {DAY_HEADERS.map(d => (
          <div key={d} style={{
            padding: '8px 0',
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 600,
            color: '#6b7280',
          }}>
            {d}
          </div>
        ))}
      </div>

      {/* Weeks */}
      <div style={{ flex: 1, display: 'grid', gridTemplateRows: `repeat(${weeks.length}, 1fr)` }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #f3f4f6' }}>
            {week.map((date, di) => {
              const dateStr = date
                ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                : null;
              const items = dateStr ? scheduledItems.filter(i => i.date === dateStr) : [];

              const isToday = date ? isSameDay(date, today) : false;
              const isSelected = date ? isSameDay(date, currentDate) : false;
              const isCurrentMonth = date?.getMonth() === month;

              return (
                <div
                  key={di}
                  onClick={() => date && handleDayClick(date)}
                  style={{
                    borderRight: di < 6 ? '1px solid #f3f4f6' : 'none',
                    padding: '6px 8px',
                    minHeight: 90,
                    cursor: date ? 'pointer' : 'default',
                    background: isSelected ? '#eff6ff' : 'transparent',
                  }}
                >
                  {date && (
                    <>
                      <div style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: isToday ? 700 : 400,
                        marginBottom: 4,
                        background: isToday ? '#2563eb' : 'transparent',
                        color: isToday ? '#fff' : isCurrentMonth ? '#111827' : '#d1d5db',
                      }}>
                        {date.getDate()}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {items.slice(0, 3).map(item => {
                          const act = activities.find(a => a.id === item.activityId);
                          if (!act) return null;
                          return (
                            <div
                              key={item.id}
                              style={{
                                background: act.color,
                                borderRadius: 3,
                                padding: '1px 5px',
                                fontSize: 10,
                                fontWeight: 600,
                                color: '#000',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {act.name}
                            </div>
                          );
                        })}
                        {items.length > 3 && (
                          <div style={{ fontSize: 10, color: '#6b7280' }}>+{items.length - 3} more</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
