import React from 'react';

const Kpi = ({ label, value, sub, color }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
    <div className="mt-1 text-3xl font-semibold" style={{ color }}>{value}</div>
    {sub && <div className="text-sm text-gray-500 mt-1">{sub}</div>}
  </div>
);

const KpiTiles = ({ savings, cloudPackets, edgePackets, theme }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Kpi label="Savings" value={`${savings}%`} sub="Bandwidth reduction" color={theme.edge}/>
      <Kpi label="Cloud packets" value={cloudPackets} color={theme.cloud}/>
      <Kpi label="Edge packets" value={edgePackets} color={theme.edge}/>
      <Kpi label="KB saved" value={((cloudPackets - edgePackets) * 0.15).toFixed(1)} color="#7c3aed"/>
    </div>
  );
};

export default KpiTiles;
