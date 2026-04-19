'use client'

import { DragEndEvent } from '@dnd-kit/core';
import { useScheduleContext } from '../store/scheduleStore';
import { Activity } from '../types/types';

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = (h ?? 0) * 60 + (m ?? 0) + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

export function useDragDrop() {
  const { addScheduledItem, scheduledItems } = useScheduleContext();

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    if (!over) return;

    const activity = active.data.current?.activity as Activity | undefined;
    if (!activity) return;

    // Slot id format: "{YYYY-MM-DD}|{HH:MM}"
    const parts = String(over.id).split('|');
    const date = parts[0];
    const startTime = parts[1];
    if (!date || !startTime) return;

    const endTime = addMinutes(startTime, activity.duration);
    const newStart = toMinutes(startTime);
    const newEnd = toMinutes(endTime);

    const hasConflict = scheduledItems.some(item => {
      if (item.date !== date) return false;
      const s = toMinutes(item.startTime);
      const e = toMinutes(item.endTime);
      return newStart < e && newEnd > s;
    });

    if (hasConflict) return;

    addScheduledItem({ activityId: activity.id, date, startTime, endTime });
  }

  return { handleDragEnd };
}
