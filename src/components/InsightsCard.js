import React from 'react';
import { Sparkles } from 'lucide-react';

const InsightsCard = ({ cloudPackets, edgePackets, theme }) => {
  const saved = cloudPackets - edgePackets;
  const percent = cloudPackets > 0 ? Math.round((1 - edgePackets / cloudPackets) * 100) : 0;

  const lines = [];
  if (cloudPackets === 0) {
    lines.push("Press Start to generate data.");
  } else {
    if (percent >= 60) lines.push("Edge is doing its job: heavy savings with minimal signal loss.");
    if (saved > 0 && saved < 20) lines.push("Small but steady savings, tighten thresholds for more.");
    if (edgePackets === 0) lines.push("No edge sends yet, your thresholds may be too strict.");
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-xl font-semibold">Insights</h2>
      </div>
      {lines.length === 0 ? (
        <div className="text-gray-600 text-sm">Run the sim to see live notes.</div>
      ) : (
        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
          {lines.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      )}
    </div>
  );
};

export default InsightsCard;
