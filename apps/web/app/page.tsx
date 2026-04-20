'use client';

import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Activity } from './types/types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Timetable } from './components/Timetable/Timetable';
import { useDragDrop } from './hooks/useDragDrop';

function ScheduleApp() {
  const { handleDragEnd } = useDragDrop();
  const [draggingActivity, setDraggingActivity] = useState<Activity | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
  );

  function onDragStart(event: DragStartEvent) {
    const activity = event.active.data.current?.activity as Activity | undefined;
    setDraggingActivity(activity ?? null);
    setSidebarOpen(false);
  }

  function onDragEnd(event: DragEndEvent) {
    handleDragEnd(event);
    setDraggingActivity(null);
  }

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex flex-col h-dvh bg-bg md:h-screen md:p-3 md:gap-3">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex flex-1 overflow-hidden md:rounded-xl md:border md:border-border relative">
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-overlay z-150 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <Timetable />
        </div>
      </div>

      <DragOverlay>
        {draggingActivity && (
          <div
            className="px-3 py-1.5 rounded-md text-[13px] font-semibold pointer-events-none shadow-lg"
            style={{ background: draggingActivity.color, color: '#2e2201' }}
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
