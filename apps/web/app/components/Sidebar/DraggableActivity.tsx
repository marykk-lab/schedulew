'use client'

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Activity } from '../../types/types';

interface Props {
  activity: Activity;
}

export function DraggableActivity({ activity }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: activity.id,
    data: { activity },
  });

  return (
    <div
      ref={setNodeRef}
      className="cursor-grab flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-card border border-border select-none touch-none text-text"
      style={{ transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.4 : 1 }}
      {...listeners}
      {...attributes}
    >
      <span
        className="w-3 h-3 rounded-full shrink-0"
        style={{ background: activity.color }}
      />
      <span className="text-sm font-medium text-text">{activity.name}</span>
      <span className="text-[12px] text-text-secondary ml-auto">{activity.duration}m</span>
    </div>
  );
}
