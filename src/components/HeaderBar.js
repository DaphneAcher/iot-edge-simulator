import React from 'react';
import * as Icons from 'lucide-react';

const HeaderBar = ({ scenarios, selectedKey, onSelect, theme }) => {
  return (
    <div className="mb-6">
      <div className="mb-3">
        <h1 className={theme.h1}>Edge vs Cloud: Simulator</h1>
      </div>
      <div className={theme.card + ' overflow-x-auto'}>
        <div className="flex gap-2 min-w-max">
          {Object.entries(scenarios).map(([key, s]) => {
            const Icon = Icons[s.icon];
            const active = key === selectedKey;
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className={theme.pill + (active ? ' underline' : '')}
                title={s.description}
              >
                {Icon && <Icon size={14} className="inline-block mr-1 text-gray-700" />}
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>
        <div className={theme.muted + ' text-xs mt-2'}>{scenarios[selectedKey].description}</div>
      </div>
    </div>
  );
};

export default HeaderBar;
