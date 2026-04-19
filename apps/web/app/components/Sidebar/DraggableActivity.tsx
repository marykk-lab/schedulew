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

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    cursor: 'grab',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 10px',
    borderRadius: 6,
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    userSelect: 'none',
    touchAction: 'none',
    color: '#111827',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: activity.color,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>{activity.name}</span>
      <span style={{ fontSize: 12, color: '#6b7280', marginLeft: 'auto' }}>{activity.duration}m</span>
    </div>
  );
}
