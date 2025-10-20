import React, { useEffect, useState } from 'react';
import { SCENARIOS } from '../constants/scenarios';
import { THEMES } from '../constants/theme';

import HeaderBar from './HeaderBar';
import ControlToolbar from './ControlToolbar';
import KpiTiles from './KpiTiles';
import SensorTable from './SensorTable';
import EventFeed from './EventFeed';
import ChartsSection from './ChartsSection';
import ArchitectureFlow from './ArchitectureFlow';
import InsightsCard from './InsightsCard';

const IoTEdgeSimulator = () => {
  const theme = THEMES.light; 

  const [selectedScenario, setSelectedScenario] = useState('traffic');
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [cloudData, setCloudData] = useState([]);
  const [edgeData, setEdgeData] = useState([]);
  const [sensorData, setSensorData] = useState({});
  const [lastSentData, setLastSentData] = useState({});
  const [cloudPackets, setCloudPackets] = useState(0);
  const [edgePackets, setEdgePackets] = useState(0);
  const [dataRate, setDataRate] = useState(500);
  const [events, setEvents] = useState([]);
  const [anomalyDetection, setAnomalyDetection] = useState(true);

  const scenario = SCENARIOS[selectedScenario];

  useEffect(() => {
    const initial = {};
    const last = {};
    scenario.sensors.forEach(s => { initial[s.id] = s.initial; last[s.id] = s.initial; });
    setSensorData(initial);
    setLastSentData(last);
    setIsRunning(false);
    setTime(0);
    setCloudData([]);
    setEdgeData([]);
    setCloudPackets(0);
    setEdgePackets(0);
    setEvents([]);
  }, [selectedScenario]);

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setCloudData([]);
    setEdgeData([]);
    setCloudPackets(0);
    setEdgePackets(0);
    setEvents([]);
    setDataRate(500);
    setAnomalyDetection(true);
    const initial = {};
    const last = {};
    scenario.sensors.forEach(s => { initial[s.id] = s.initial; last[s.id] = s.initial; });
    setSensorData(initial);
    setLastSentData(last);
  };

  // simulation loop
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTime(t => {
        const newTime = t + 1;

        // potential event
        let eventOccurred = null;
        scenario.events.forEach(ev => { if (Math.random() < ev.probability) eventOccurred = ev; });

        // sensor updates
        const next = {};
        let significant = false;
        scenario.sensors.forEach(s => {
          let v = sensorData[s.id];
          if (eventOccurred && eventOccurred.effect(sensorData)[s.id] !== undefined) {
            v = eventOccurred.effect(sensorData)[s.id];
          } else {
            const change = (Math.random() - 0.5) * s.range * 0.1;
            v = Math.max(0, v + change);
          }
          next[s.id] = parseFloat(v.toFixed(2));
          if (Math.abs(next[s.id] - lastSentData[s.id]) >= s.threshold) significant = true;
        });

        // anomaly
        let anomaly = false;
        if (anomalyDetection) {
          scenario.sensors.forEach(s => {
            const rate = Math.abs(next[s.id] - sensorData[s.id]);
            if (rate > s.threshold * 0.5) anomaly = true;
          });
        }

        setSensorData(next);
        if (eventOccurred) setEvents(prev => [...prev, { time: newTime, name: eventOccurred.name }].slice(-6));

        // cloud sends always
        setCloudPackets(c => c + 1);

        // edge sends only when needed
        let edgeSent = false;
        if (significant || anomaly || eventOccurred) {
          setEdgePackets(e => e + 1);
          setLastSentData(next);
          edgeSent = true;
        }

        // chart points every 10 ticks
        if (newTime % 10 === 0) {
          setCloudData(prev => [...prev, { time: newTime, bandwidth: (cloudPackets + 10) * 0.15 }].slice(-40));
          setEdgeData(prev => [...prev, { time: newTime, bandwidth: (edgePackets + (edgeSent ? 1 : 0)) * 0.15 }].slice(-40));
        }

        return newTime;
      });
    }, dataRate);
    return () => clearInterval(interval);
  }, [isRunning, sensorData, lastSentData, scenario, cloudPackets, edgePackets, dataRate, anomalyDetection]); // eslint-disable-line

  const savings = cloudPackets > 0 ? ((1 - edgePackets / cloudPackets) * 100).toFixed(1) : 0;

  return (
    <div className={theme.page}>
      <div className={theme.shell}>
        <HeaderBar
          scenarios={SCENARIOS}
          selectedKey={selectedScenario}
          onSelect={setSelectedScenario}
          theme={theme}
        />

        <ControlToolbar
          isRunning={isRunning}
          onToggle={() => setIsRunning(v => !v)}
          onReset={reset}
          dataRate={dataRate}
          setDataRate={setDataRate}
          anomalyDetection={anomalyDetection}
          setAnomaly={setAnomalyDetection}
          time={time}
          theme={theme}
        />

        <div className="mt-6">
          <KpiTiles
            savings={savings}
            cloudPackets={cloudPackets}
            edgePackets={edgePackets}
            theme={theme}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SensorTable sensors={scenario.sensors} sensorData={sensorData} lastSentData={lastSentData} theme={theme} />
          <EventFeed events={events} theme={theme} />
        </div>

        <div className="mt-6">
          <ChartsSection
            cloudData={cloudData}
            edgeData={edgeData}
            cloudPackets={cloudPackets}
            edgePackets={edgePackets}
            theme={theme}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ArchitectureFlow theme={theme} />
          <InsightsCard cloudPackets={cloudPackets} edgePackets={edgePackets} theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default IoTEdgeSimulator;
