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

  return {
    activities,
    scheduledItems,
    addActivity,
    deleteActivity,
    addScheduledItem,
    deleteScheduledItem,
  };
}
