import { ScheduleData } from '../types/types';

export const mockScheduleData: ScheduleData = {
  activities: [
    {
      id: "1",
      name: "Matematika",
      duration: 45,
      color: "#ff0000ff",
      preferredTime: "a.m."
    },
    {
      id: "2",
      name: "Programování",
      duration: 90,
      color: "#0073ffff",
      preferredDay: 'Tuesday'
    },
    {
      id: "3",
      name: "Tělocvik",
      duration: 45,
      color: "#00ff5eff",
      preferredTime: "p.m."
    }
  ],
  scheduledItems: [
    {
      id: "1",
      activityId: "1",
      date: "2026-04-20",
      startTime: "08:00",
      endTime: "08:45"
    },
    {
      id: "2",
      activityId: "2",
      date: "2026-04-21",
      startTime: "10:00",
      endTime: "11:30"
    }
  ]
};