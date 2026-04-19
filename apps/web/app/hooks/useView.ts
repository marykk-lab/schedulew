'use client'

import { useState } from 'react';
import { ViewState, ViewMode } from '../store/viewStore';

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export function useView(): ViewState {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  function goNext() {
    if (viewMode === 'day') setCurrentDate(d => addDays(d, 1));
    else if (viewMode === 'week') setCurrentDate(d => addDays(d, 7));
    else setCurrentDate(d => addMonths(d, 1));
  }

  function goPrev() {
    if (viewMode === 'day') setCurrentDate(d => addDays(d, -1));
    else if (viewMode === 'week') setCurrentDate(d => addDays(d, -7));
    else setCurrentDate(d => addMonths(d, -1));
  }

  return { viewMode, currentDate, setViewMode, setCurrentDate, goNext, goPrev };
}
