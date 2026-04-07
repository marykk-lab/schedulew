'use client'

import { ReactNode } from 'react';
import { ScheduleContext } from '../store/scheduleStore';
import { useSchedule } from '../hooks/useSchedule';

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const schedule = useSchedule();
  return (
    
    <ScheduleContext.Provider value={schedule}>
      {children}
    </ScheduleContext.Provider>
  );
}