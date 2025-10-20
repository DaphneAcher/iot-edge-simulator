import React from 'react';
import { Waves, Cpu, Cloud } from 'lucide-react';

const Dot = ({ label }) => (
  <div className="flex items-center gap-2">
    <div className="w-2 h-2 rounded-full bg-gray-400" />
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

const ArchitectureFlow = ({ theme }) => {
  return (
    <div className={theme.card}>
      <h2 className={`${theme.h2} mb-3`}>Architecture</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cloud-only */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Waves className="text-gray-600" size={18}/> <span className="font-medium">Cloud-only (baseline)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-600 text-white px-3 py-2 text-xs">IoT</div>
            <div className="text-gray-400">→</div>
            <Cloud className="text-blue-600" />
          </div>
          <div className="mt-3 space-y-1">
            <Dot label="All readings streamed continuously" />
            <Dot label="High bandwidth, noisy data" />
          </div>
        </div>

        {/* Edge filtering */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="text-gray-600" size={18}/> <span className="font-medium">Edge filtering (optimized)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-600 text-white px-3 py-2 text-xs">IoT</div>
            <div className="text-gray-400">→</div>
            <div className="rounded-xl bg-emerald-600 text-white px-3 py-2 text-xs">Edge</div>
            <div className="text-gray-400">→</div>
            <Cloud className="text-purple-600" />
          </div>
          <div className="mt-3 space-y-1">
            <Dot label="Thresholds + anomaly triggers only" />
            <Dot label="Fewer packets, higher signal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureFlow;
