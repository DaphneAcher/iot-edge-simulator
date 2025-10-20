import React from 'react';

const SensorTable = ({ sensors, sensorData, lastSentData, theme }) => {
  return (
    <div className={theme.card}>
      <h2 className={`${theme.h2} mb-3`}>Sensors</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Value</th>
              <th className="py-2 pr-4">Δ since sent</th>
              <th className="py-2">Threshold</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map(s => {
              const val = sensorData[s.id] ?? s.initial;
              const delta = Math.abs((sensorData[s.id] ?? s.initial) - (lastSentData[s.id] ?? s.initial));
              const breached = delta >= s.threshold;
              return (
                <tr key={s.id} className="border-t">
                  <td className="py-2 pr-4">{s.name}</td>
                  <td className="py-2 pr-4 tabular-nums">{val.toFixed(2)} {s.unit}</td>
                  <td className={`py-2 pr-4 tabular-nums ${breached ? 'text-red-600 font-medium' : 'text-emerald-700'}`}>
                    {delta.toFixed(2)}
                  </td>
                  <td className="py-2">{s.threshold}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorTable;
