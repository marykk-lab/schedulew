'use client'

import React from 'react';
import { useScheduleContext } from '../../store/scheduleStore';
import { DayOfWeek } from '../../types/types';
import { TimeSlot } from './TimeSlot';
import { TIME_SLOTS } from './Timetable';

interface Props {
  day: DayOfWeek;
  date: Date;
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

function toISODate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function DayColumn({ day, date }: Props) {
  const { scheduledItems, activities, deleteScheduledItem } = useScheduleContext();

  const dateStr = toISODate(date);
  const dayItems = scheduledItems.filter(i => i.date === dateStr);

  const coveredSlots = new Set<string>();
  for (const item of dayItems) {
    const startMin = timeToMinutes(item.startTime);
    const endMin = timeToMinutes(item.endTime);
    const durationSlots = Math.ceil((endMin - startMin) / 30);
    const slotIndex = TIME_SLOTS.indexOf(item.startTime);
    for (let i = 1; i < durationSlots; i++) {
      const covered = TIME_SLOTS[slotIndex + i];
      if (covered) coveredSlots.add(covered);
    }
  }

  const isToday = (() => {
    const t = new Date();
    return toISODate(t) === dateStr;
  })();

  return (
    <div className="flex-1 min-w-25 border-r border-border">
      <div className={`h-9 border-b border-border flex items-center justify-center gap-1 text-[12px] font-semibold ${isToday ? 'text-accent' : 'text-text-secondary'}`}>
        <span>{day.slice(0, 3)}</span>
        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${isToday ? 'bg-accent text-text-on-accent' : 'text-text-disabled'}`}>
          {date.getDate()}
        </span>
      </div>

      {TIME_SLOTS.map(time => {
        if (coveredSlots.has(time)) return null;

        const slotId = `${dateStr}|${time}`;
        const item = dayItems.find(i => i.startTime === time);
        const activity = item ? activities.find(a => a.id === item.activityId) : undefined;

        let slotSpan = 1;
        if (item) {
          const startMin = timeToMinutes(item.startTime);
          const endMin = timeToMinutes(item.endTime);
          slotSpan = Math.ceil((endMin - startMin) / 30);
        }

        return (
          <TimeSlot
            key={slotId}
            slotId={slotId}
            scheduledItem={item}
            activity={activity}
            slotSpan={slotSpan}
            onRemove={item ? () => deleteScheduledItem(item.id) : undefined}
          />
        );
      })}
    </div>
  );
}
