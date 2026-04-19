'use client'

import React from 'react';
import { useScheduleContext } from '../../store/scheduleStore';
import { DraggableActivity } from './DraggableActivity';

export function ActivityList() {
  const { activities, deleteActivity } = useScheduleContext();

  if (activities.length === 0) {
    return <p style={{ fontSize: 13, color: '#9ca3af', margin: 0 }}>No activities yet.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {activities.map(a => (
        <li key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ flex: 1 }}>
            <DraggableActivity activity={a} />
          </div>
          <button
            onClick={() => deleteActivity(a.id)}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#9ca3af',
              fontSize: 14,
              padding: '4px 6px',
            }}
            title="Remove activity"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
