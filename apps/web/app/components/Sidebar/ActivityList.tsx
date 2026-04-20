'use client'

import React from 'react';
import { useScheduleContext } from '../../store/scheduleStore';
import { DraggableActivity } from './DraggableActivity';

export function ActivityList() {
  const { activities, deleteActivity } = useScheduleContext();

  if (activities.length === 0) {
    return <p className="text-[13px] text-text-disabled m-0">No activities yet.</p>;
  }

  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
      {activities.map(a => (
        <li key={a.id} className="flex items-center gap-1">
          <div className="flex-1">
            <DraggableActivity activity={a} />
          </div>
          <button
            onClick={() => deleteActivity(a.id)}
            className="border-0 bg-transparent cursor-pointer text-text-disabled text-sm px-1.5 py-1 hover:text-error transition-colors duration-150"
            title="Remove activity"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
