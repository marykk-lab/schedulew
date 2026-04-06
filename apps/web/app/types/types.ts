export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface Activity {
  id: string;
  name: string;
  duration: number;
  color: string;
  preferredDay?: DayOfWeek | null;
  preferredTime?: 'a.m.' | 'p.m.' | null;
}

export interface ScheduledItem {
  id: string;
  activityId: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
}

//for json data
export interface ScheduleData {
  activities: Activity[];
  scheduledItems: ScheduledItem[];
}