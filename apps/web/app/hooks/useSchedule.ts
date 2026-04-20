'use client'

import { useEffect, useRef, useState } from 'react';
import { Activity, ScheduledItem } from '../types/types';
import { mockScheduleData } from '../data/mockData';
import { ScheduleState } from '../store/scheduleStore';

const STORAGE_KEY = 'schedulew_data';

function loadFromStorage(): { activities: Activity[]; scheduledItems: ScheduledItem[] } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as { activities: Activity[]; scheduledItems: ScheduledItem[] };
  } catch {}
  return null;
}

function saveToStorage(activities: Activity[], scheduledItems: ScheduledItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ activities, scheduledItems }));
  } catch {}
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function useSchedule(): ScheduleState {
  const [activities, setActivities] = useState<Activity[]>(mockScheduleData.activities);
  const [scheduledItems, setScheduledItems] = useState<ScheduledItem[]>(mockScheduleData.scheduledItems);

  const ready = useRef(false);

  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      setActivities(saved.activities);
      setScheduledItems(saved.scheduledItems);
    }
    ready.current = true;
  }, []);

  useEffect(() => {
    if (!ready.current) return;
    saveToStorage(activities, scheduledItems);
  }, [activities, scheduledItems]);

  function addActivity(activity: Omit<Activity, 'id'>) {
    setActivities(prev => [...prev, { ...activity, id: generateId() }]);
  }

  function deleteActivity(id: string) {
    setActivities(prev => prev.filter(a => a.id !== id));
    setScheduledItems(prev => prev.filter(s => s.activityId !== id));
  }

  function addScheduledItem(item: Omit<ScheduledItem, 'id'>) {
    setScheduledItems(prev => [...prev, { ...item, id: generateId() }]);
  }

  function deleteScheduledItem(id: string) {
    setScheduledItems(prev => prev.filter(s => s.id !== id));
  }

  function exportData() {
    const json = JSON.stringify({ activities, scheduledItems }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schedulew-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importData(json: string) {
    try {
      const parsed = JSON.parse(json) as { activities: Activity[]; scheduledItems: ScheduledItem[] };
      if (!Array.isArray(parsed.activities) || !Array.isArray(parsed.scheduledItems)) return;
      setActivities(parsed.activities);
      setScheduledItems(parsed.scheduledItems);
    } catch {}
  }

  return {
    activities,
    scheduledItems,
    addActivity,
    deleteActivity,
    addScheduledItem,
    deleteScheduledItem,
    exportData,
    importData,
  };
}
