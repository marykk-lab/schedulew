'use client'

import { createContext, useContext } from 'react';
import { Activity, ScheduledItem } from '../types/types';

export interface ScheduleState {
  activities: Activity[];
  scheduledItems: ScheduledItem[];
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  deleteActivity: (id: string) => void;
  addScheduledItem: (item: Omit<ScheduledItem, 'id'>) => void;
  deleteScheduledItem: (id: string) => void;
}

export const ScheduleContext = createContext<ScheduleState | null>(null);

export function useScheduleContext(): ScheduleState {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error('useScheduleContext must be used inside <ScheduleProvider>');
  return ctx;
}
