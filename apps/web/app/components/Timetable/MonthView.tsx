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
    <div className="flex-1 flex flex-col overflow-auto text-text">
      <div className="grid grid-cols-7 border-b border-border">
        {DAY_HEADERS.map(d => (
          <div key={d} className="py-2 text-center text-[12px] font-semibold text-text-secondary">
            {d}
          </div>
        ))}
      </div>

      <div
        className="flex-1 grid"
        style={{ gridTemplateRows: `repeat(${weeks.length}, 1fr)` }}
      >
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 border-b border-border">
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
                  className={`${di < 6 ? 'border-r border-border' : ''} p-1.5 min-h-22.5 ${date ? 'cursor-pointer' : 'cursor-default'} ${isSelected ? 'bg-tint' : ''}`}
                >
                  {date && (
                    <>
                      <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[12px] mb-1 ${isToday ? 'bg-accent text-text-on-accent font-bold' : `font-normal ${isCurrentMonth ? 'text-text' : 'text-text-disabled'}`}`}>
                        {date.getDate()}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {items.slice(0, 3).map(item => {
                          const act = activities.find(a => a.id === item.activityId);
                          if (!act) return null;
                          return (
                            <div
                              key={item.id}
                              className="rounded-sm py-px px-1.5 text-[10px] font-semibold truncate text-black"
                              style={{ background: act.color }}
                            >
                              {act.name}
                            </div>
                          );
                        })}
                        {items.length > 3 && (
                          <div className="text-[10px] text-text-secondary">+{items.length - 3} more</div>
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
