import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ScheduleW',
    short_name: 'ScheduleW',
    description: 'Weekly schedule planner',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#161711',
    theme_color: '#1a1710',
    categories: ['productivity', 'education'],
    icons: [
      { src: '/icons/192', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/512', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
