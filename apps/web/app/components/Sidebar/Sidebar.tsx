'use client'

import React, { useState } from 'react';
import { ActivityList } from './ActivityList';
import { ActivityModal } from './ActivityModal';
import { MiniCalendar } from './MiniCalendar';

export function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <aside
        style={{
          width: 260,
          minHeight: '100vh',
          borderRight: '1px solid #e5e7eb',
          padding: '16px',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          flexShrink: 0,
        }}
      >
        <MiniCalendar />

        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>Activities</h2>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 10px',
                borderRadius: 7,
                border: 'none',
                background: '#2563eb',
                color: '#fff',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              + Add
            </button>
          </div>
          <ActivityList />
        </div>
      </aside>

      {modalOpen && <ActivityModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
