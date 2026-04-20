import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ScheduleProvider } from './components/ScheduleProvider';
import { ViewProvider } from './components/ViewProvider';
import { ServiceWorkerRegister } from './components/ServiceWorkerRegister';

export const metadata: Metadata = {
  title: 'ScheduleW',
  description: 'Weekly schedule planner',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ScheduleW',
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1710',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ScheduleProvider>
          <ViewProvider>
            {children}
          </ViewProvider>
        </ScheduleProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
