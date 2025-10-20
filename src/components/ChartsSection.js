import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         BarChart, Bar } from 'recharts';

const ChartsSection = ({ cloudData, edgeData, cloudPackets, edgePackets, theme }) => {
  const bars = [
    { name: 'Cloud', packets: cloudPackets, fill: theme.cloud },
    { name: 'Edge',  packets: edgePackets,  fill: theme.edge }
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className={theme.card}>
        <h2 className={`${theme.h2} mb-3`}>Bandwidth over time</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />
            <XAxis dataKey="time" type="number" domain={['dataMin','dataMax']} stroke={theme.axis}
                   label={{ value: 's', position: 'insideBottomRight', offset: -8, fill: theme.axis }} />
            <YAxis stroke={theme.axis} label={{ value: 'KB', angle: -90, position: 'insideLeft', fill: theme.axis }} />
            <Tooltip />
            <Legend />
            <Line data={cloudData} type="monotone" dataKey="bandwidth" name="Cloud" stroke={theme.cloud} strokeWidth={2} dot={false}/>
            <Line data={edgeData}  type="monotone" dataKey="bandwidth" name="Edge"  stroke={theme.edge}  strokeWidth={2} dot={false}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={theme.card}>
        <h2 className={`${theme.h2} mb-3`}>Total packets</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={bars}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />
            <XAxis dataKey="name" stroke={theme.axis} />
            <YAxis stroke={theme.axis} />
            <Tooltip />
            <Bar dataKey="packets" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;
