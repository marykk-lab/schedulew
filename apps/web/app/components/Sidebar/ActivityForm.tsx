'use client'

import { useState } from 'react';
import { useScheduleContext } from '../../store/scheduleStore';
import { DayOfWeek } from '../../types/types';

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function ActivityForm() {
  const { activities, addActivity, deleteActivity } = useScheduleContext();

  const [name, setName] = useState('');
  const [duration, setDuration] = useState(45);
  const [color, setColor] = useState('#3b82f6');
  const [preferredDay, setPreferredDay] = useState<DayOfWeek | ''>('');
  const [preferredTime, setPreferredTime] = useState<'a.m.' | 'p.m.' | ''>('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    addActivity({
      name: name.trim(),
      duration,
      color,
      preferredDay: preferredDay || null,
      preferredTime: preferredTime || null,
    });
    setName('');
    setDuration(45);
    setColor('#3b82f6');
    setPreferredDay('');
    setPreferredTime('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Activity name"
            required
          />
        </div>

        <div>
          <label>Duration (min)</label>
          <input
            type="number"
            value={duration}
            min={5}
            step={5}
            onChange={e => setDuration(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Color</label>
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        </div>

        <div>
          <label>Preferred day</label>
          <select value={preferredDay} onChange={e => setPreferredDay(e.target.value as DayOfWeek | '')}>
            <option value="">Any</option>
            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label>Preferred time</label>
          <select value={preferredTime} onChange={e => setPreferredTime(e.target.value as 'a.m.' | 'p.m.' | '')}>
            <option value="">Any</option>
            <option value="a.m.">a.m.</option>
            <option value="p.m.">p.m.</option>
          </select>
        </div>

        <button type="submit">Add activity</button>
      </form>

      <ul>
        {activities.map(a => (
          <li key={a.id}>
            <span style={{ background: a.color, width: 12, height: 12, display: 'inline-block', marginRight: 6 }} />
            {a.name} — {a.duration}min
            <button onClick={() => deleteActivity(a.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
