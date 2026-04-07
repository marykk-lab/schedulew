'use client'

import { useState } from 'react';
import { Activity, ScheduledItem } from '../types/types';
import { mockScheduleData } from '../data/mockData';
import { ScheduleState } from '../store/scheduleStore';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function useSchedule(): ScheduleState {
  const [activities, setActivities] = useState<Activity[]>(mockScheduleData.activities);
  const [scheduledItems, setScheduledItems] = useState<ScheduledItem[]>(mockScheduleData.scheduledItems);


  function addActivity(activity: Omit<Activity, 'id'>) {
    setActivities(prev => [...prev, { ...activity, id: generateId() }]);
  }

  function updateActivity(id: string, updates: Partial<Omit<Activity, 'id'>>) {
    setActivities(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
  }

  function deleteActivity(id: string) {
    setActivities(prev => prev.filter(a => a.id !== id));
    setScheduledItems(prev => prev.filter(s => s.activityId !== id));
  }


  function addScheduledItem(item: Omit<ScheduledItem, 'id'>) {
    setScheduledItems(prev => [...prev, { ...item, id: generateId() }]);
  }

  function updateScheduledItem(id: string, updates: Partial<Omit<ScheduledItem, 'id'>>) {
    setScheduledItems(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  }

  function deleteScheduledItem(id: string) {
    setScheduledItems(prev => prev.filter(s => s.id !== id));
  }

  return {
    activities,
    scheduledItems,
    addActivity,
    updateActivity,
    deleteActivity,
    addScheduledItem,
    updateScheduledItem,
    deleteScheduledItem,
  };
}
