import React from 'react';

const Kpi = ({ label, value, sub, theme }) => (
  <div className={theme.kpiCard}>
    <div className="text-xs uppercase tracking-wide text-gray-600">{label}</div>
    <div className={theme.kpiValue + ' mt-1 text-2xl'}>{value}</div>
    {sub && <div className={theme.kpiSub + ' mt-1'}>{sub}</div>}
  </div>
);

const KpiTiles = ({ savings, cloudPackets, edgePackets, theme }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Kpi label="Savings" value={`${savings}%`} sub="Bandwidth reduction" theme={theme} />
      <Kpi label="Cloud packets" value={cloudPackets} theme={theme} />
      <Kpi label="Edge packets" value={edgePackets} theme={theme} />
      <Kpi label="KB saved" value={((cloudPackets - edgePackets) * 0.15).toFixed(1)} theme={theme} />
    </div>
  );
};

export default KpiTiles;
