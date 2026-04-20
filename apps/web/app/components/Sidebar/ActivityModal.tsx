'use client'

import React, { useEffect, useState } from 'react';
import { useScheduleContext } from '../../store/scheduleStore';
import { DayOfWeek } from '../../types/types';

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface Props {
  onClose: () => void;
}

export function ActivityModal({ onClose }: Props) {
  const { addActivity } = useScheduleContext();

  const [name, setName] = useState('');
  const [duration, setDuration] = useState(45);
  const [color, setColor] = useState('#3b82f6');
  const [preferredDay, setPreferredDay] = useState<DayOfWeek | ''>('');
  const [preferredTime, setPreferredTime] = useState<'a.m.' | 'p.m.' | ''>('');

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

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
    onClose();
  }

  const inputCls = 'w-full px-3.5 py-2.5 rounded-lg border border-border text-[13px] text-text bg-input outline-none';
  const labelCls = 'text-[12px] font-semibold text-text-secondary mb-1.5 block';

  return (
    <div
      className="fixed inset-0 bg-overlay flex flex-col justify-end md:items-center md:justify-center z-300"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-t-2xl md:rounded-2xl p-8 w-full md:w-96 shadow-lg text-text"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-text m-0">New activity</h2>
          <button
            onClick={onClose}
            className="border-0 bg-card cursor-pointer rounded-md text-sm text-text-secondary w-7 h-7 flex items-center justify-center hover:text-text transition-colors duration-150"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className={labelCls}>Name</label>
            <input
              className={inputCls}
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Math"
              required
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Duration (min)</label>
              <input
                className={inputCls}
                type="number"
                value={duration}
                min={5}
                step={5}
                onChange={e => setDuration(Number(e.target.value))}
              />
            </div>
            <div>
              <label className={labelCls}>Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="w-9 h-9 border-0 rounded-md cursor-pointer p-0.5 bg-transparent"
                />
                <span className="text-[12px] text-text-secondary">{color}</span>
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>Preferred day</label>
            <select
              className={inputCls}
              value={preferredDay}
              onChange={e => setPreferredDay(e.target.value as DayOfWeek | '')}
            >
              <option value="">Any</option>
              {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>Preferred time</label>
            <select
              className={inputCls}
              value={preferredTime}
              onChange={e => setPreferredTime(e.target.value as 'a.m.' | 'p.m.' | '')}
            >
              <option value="">Any</option>
              <option value="a.m.">Morning (a.m.)</option>
              <option value="p.m.">Afternoon (p.m.)</option>
            </select>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-border bg-card text-text-secondary text-[13px] font-semibold cursor-pointer hover:bg-surface transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl border-0 bg-accent text-text-on-accent text-[13px] font-semibold cursor-pointer hover:bg-accent-dark transition-colors duration-150"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
