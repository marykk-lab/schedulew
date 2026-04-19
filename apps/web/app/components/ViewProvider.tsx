'use client'

import React, { ReactNode } from 'react';
import { ViewContext } from '../store/viewStore';
import { useView } from '../hooks/useView';

export function ViewProvider({ children }: { children: ReactNode }) {
  const view = useView();
  return <ViewContext.Provider value={view}>{children}</ViewContext.Provider>;
}
