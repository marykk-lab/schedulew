'use client'

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Activity, ScheduledItem } from '../../types/types';

export const SLOT_HEIGHT = 32;

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

  const baseStyle: React.CSSProperties = {
    height: SLOT_HEIGHT,
    borderBottom: '1px solid #f3f4f6',
    position: 'relative',
    background: isOver && !isOccupied ? '#eff6ff' : 'transparent',
    transition: 'background 0.1s',
  };

  if (isOccupied) {
    return (
      <div ref={setNodeRef} style={baseStyle}>
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: 2,
            right: 2,
            height: SLOT_HEIGHT * slotSpan - 4,
            background: activity.color,
            borderRadius: 4,
            padding: '2px 6px',
            fontSize: 11,
            color: '#000000',
            fontWeight: 600,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {activity.name}
          </span>
          {onRemove && (
            <button
              onClick={onRemove}
              style={{
                border: 'none',
                background: 'rgba(255,255,255,0.3)',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: 3,
                fontSize: 10,
                padding: '1px 4px',
                flexShrink: 0,
                marginLeft: 4,
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    );
  }

  return <div ref={setNodeRef} style={baseStyle} />;
}
