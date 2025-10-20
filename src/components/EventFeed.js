import React from 'react';
import { BellRing } from 'lucide-react';

const EventFeed = ({ events, theme }) => {
  return (
    <div className={theme.card}>
      <div className="flex items-center justify-between mb-3">
        <h2 className={theme.h2}>Events</h2>
        <BellRing size={18} className="text-orange-600" />
      </div>
      {events.length === 0 ? (
        <div className={theme.muted}>No recent events</div>
      ) : (
        <ul className="space-y-2">
          {events.slice().reverse().map((e, i) => (
            <li key={i} className="flex items-center justify-between text-sm">
              <span className="font-medium">{e.name}</span>
              <span className="text-gray-500 tabular-nums">t={e.time}s</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventFeed;
