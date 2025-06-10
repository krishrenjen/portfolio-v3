'use client';
import { useState } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';

type Tab = {
  label: string;
  content: ReactNode;
};

export default function TabbedMenu({ tabs }: { tabs: Tab[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      <div className="flex justify-start bg-[#111] rounded-t-md border border-[#1f1e1e] border-b-0 px-2 py-2">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(idx)}
            className={clsx(
              'px-6 py-2 text-sm font-medium w-full rounded-md cursor-pointer',
              idx === activeIndex
                ? 'bg-[#1a1a1a] text-white'
                : 'text-gray-400 hover:text-white'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="border border-[#1f1e1e] rounded-b-md py-2">{tabs[activeIndex].content}</div>
    </div>
  );
}
