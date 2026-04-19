'use client';

import React, { useState } from 'react';
import { DndContext, DragOverlay, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { Activity } from './types/types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Timetable } from './components/Timetable/Timetable';
import { useDragDrop } from './hooks/useDragDrop';

function ScheduleApp() {
  const { handleDragEnd } = useDragDrop();
  const [draggingActivity, setDraggingActivity] = useState<Activity | null>(null);

  function onDragStart(event: DragStartEvent) {
    const activity = event.active.data.current?.activity as Activity | undefined;
    setDraggingActivity(activity ?? null);
  }

  function onDragEnd(event: DragEndEvent) {
    handleDragEnd(event);
    setDraggingActivity(null);
  }

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#fff' }}>
        <Header />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar />
          <Timetable />
        </div>
      </div>
      <DragOverlay>
        {draggingActivity && (
          <div
            style={{
              padding: '6px 12px',
              background: draggingActivity.color,
              color: '#2e2201',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
            }}
          >
            {draggingActivity.name} · {draggingActivity.duration}m
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default function Home() {
  return <ScheduleApp />;
}
