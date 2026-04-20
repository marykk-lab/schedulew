'use client'

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Activity, ScheduledItem } from '../../types/types';

export const SLOT_HEIGHT = 36;

interface Props {
  slotId: string;
  scheduledItem?: ScheduledItem;
  activity?: Activity;
  slotSpan?: number;
  onRemove?: () => void;
}

export function TimeSlot({ slotId, scheduledItem, activity, slotSpan = 1, onRemove }: Props) {
  const isOccupied = !!scheduledItem && !!activity;
  const { setNodeRef, isOver } = useDroppable({ id: slotId, disabled: isOccupied });

  return (
    <div
      ref={setNodeRef}
      className={`border-b border-border relative transition-colors duration-100 ${isOver && !isOccupied ? 'bg-tint' : ''}`}
      style={{ height: SLOT_HEIGHT }}
    >
      {isOccupied && (
        <div
          className="absolute top-0.5 left-0.5 right-0.5 rounded overflow-hidden flex items-center justify-between px-1.5 text-[11px] font-semibold text-black z-10"
          style={{
            height: SLOT_HEIGHT * slotSpan - 4,
            background: activity.color,
          }}
        >
          <span className="truncate">{activity.name}</span>
          {onRemove && (
            <button
              onClick={onRemove}
              className="border-0 bg-white/30 text-white cursor-pointer rounded-sm text-[10px] px-1 shrink-0 ml-1"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
}
