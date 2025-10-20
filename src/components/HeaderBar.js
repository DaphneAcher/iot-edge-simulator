import React from 'react';
import * as Icons from 'lucide-react';

const HeaderBar = ({ scenarios, selectedKey, onSelect, theme }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className={theme.h1}>Edge vs Cloud: Interactive Simulator</h1>
      </div>

      {/* scenario chips */}
      <div className={`${theme.card} overflow-x-auto`}>
        <div className="flex gap-3 min-w-max">
          {Object.entries(scenarios).map(([key, s]) => {
            const Icon = Icons[s.icon];
            const active = key === selectedKey;
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className={`${theme.pill} ${active ? 'border-black bg-black text-white' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
                title={s.description}
              >
                {Icon && <Icon size={16} className={active ? 'text-white' : 'text-gray-600'} />}
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>
        <div className={`${theme.muted} text-xs mt-3`}>{scenarios[selectedKey].description}</div>
      </div>
    </div>
  );
};

export default HeaderBar;
