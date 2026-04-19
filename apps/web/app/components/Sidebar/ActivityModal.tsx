'use client'

import React, { useEffect } from 'react';
import { useState } from 'react';
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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '7px 10px',
    borderRadius: 6,
    border: '1px solid #d1d5db',
    fontSize: 13,
    color: '#111827',
    background: '#fff',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 4,
    display: 'block',
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: 24,
          width: 360,
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          color: '#111827',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>New activity</h2>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: '#f3f4f6',
              cursor: 'pointer',
              borderRadius: 6,
              fontSize: 14,
              color: '#6b7280',
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input
              style={inputStyle}
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Math"
              required
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Duration (min)</label>
              <input
                style={inputStyle}
                type="number"
                value={duration}
                min={5}
                step={5}
                onChange={e => setDuration(Number(e.target.value))}
              />
            </div>
            <div>
              <label style={labelStyle}>Color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  style={{ width: 36, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 2 }}
                />
                <span style={{ fontSize: 12, color: '#6b7280' }}>{color}</span>
              </div>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Preferred day</label>
            <select
              style={inputStyle}
              value={preferredDay}
              onChange={e => setPreferredDay(e.target.value as DayOfWeek | '')}
            >
              <option value="">Any</option>
              {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Preferred time</label>
            <select
              style={inputStyle}
              value={preferredTime}
              onChange={e => setPreferredTime(e.target.value as 'a.m.' | 'p.m.' | '')}
            >
              <option value="">Any</option>
              <option value="a.m.">Morning (a.m.)</option>
              <option value="p.m.">Afternoon (p.m.)</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '9px 0',
                borderRadius: 8,
                border: '1px solid #d1d5db',
                background: '#fff',
                color: '#374151',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '9px 0',
                borderRadius: 8,
                border: 'none',
                background: '#2563eb',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
