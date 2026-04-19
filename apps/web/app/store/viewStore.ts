'use client'

import { createContext, useContext } from 'react';

export type ViewMode = 'day' | 'week' | 'month';

export interface ViewState {
  viewMode: ViewMode;
  currentDate: Date;
  setViewMode: (mode: ViewMode) => void;
  setCurrentDate: (date: Date) => void;
  goNext: () => void;
  goPrev: () => void;
}

export const ViewContext = createContext<ViewState | null>(null);

export function useViewContext(): ViewState {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error('useViewContext must be used inside <ViewProvider>');
  return ctx;
}
