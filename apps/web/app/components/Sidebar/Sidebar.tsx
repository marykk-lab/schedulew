'use client'

import React, { useRef, useState } from 'react';
import { ActivityList } from './ActivityList';
import { ActivityModal } from './ActivityModal';
import { MiniCalendar } from './MiniCalendar';
import { useScheduleContext } from '../../store/scheduleStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const { exportData, importData } = useScheduleContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      if (typeof ev.target?.result === 'string') importData(ev.target.result);
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-290 w-72
          bg-toolbar border-r border-border flex flex-col shrink-0
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:w-65 md:z-auto
        `}
      >
        <div className="p-4">
          <MiniCalendar />
        </div>

        <div className="border-t border-border px-4 pt-4 pb-2 flex-1 overflow-y-auto">
          <h2 className="m-0 mb-3 text-[14px] font-bold text-text">Activities</h2>
          <ActivityList />
        </div>

        <div className="px-4 pt-4 pb-4 mb-4 border-t border-border flex flex-col gap-2">
          <button
            onClick={() => { setModalOpen(true); onClose(); }}
            className="w-full h-12 flex items-center justify-center gap-1.5 px-3 rounded-lg border-0 bg-accent text-text-on-accent text-[13px] font-semibold cursor-pointer hover:bg-accent-dark transition-colors duration-150"
          >
            + Add Activity
          </button>

          <div className="flex gap-2">
            <button
              onClick={exportData}
              className="flex-1 py-2 rounded-lg border border-border bg-card text-text-secondary text-[12px] font-semibold cursor-pointer hover:bg-surface transition-colors duration-150"
            >
              Export JSON
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2 rounded-lg border border-border bg-card text-text-secondary text-[12px] font-semibold cursor-pointer hover:bg-surface transition-colors duration-150"
            >
              Import JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleImport}
            />
          </div>
        </div>
      </aside>

      {modalOpen && <ActivityModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
