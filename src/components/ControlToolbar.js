import React from 'react';
import { Play, Pause, RotateCcw, Activity } from 'lucide-react';

const ControlToolbar = ({ isRunning, onToggle, onReset, dataRate, setDataRate, anomalyDetection, setAnomaly, time, theme }) => {
  return (
    <div className={`${theme.card} flex flex-wrap items-center gap-3`}>
      <button onClick={onToggle} className={`${theme.btn} ${theme.btnPrimary}`}>
        {isRunning ? <><Pause size={16}/> Pause</> : <><Play size={16}/> Start</>}
      </button>
      <button onClick={onReset} className={`${theme.btn} ${theme.btnGhost}`}>
        <RotateCcw size={16}/> Reset
      </button>

      <div className="flex items-center gap-2 ml-2">
        <label className="text-sm">Rate</label>
        <input type="range" min="100" max="1000" step="100" value={dataRate} onChange={e => setDataRate(parseInt(e.target.value))}/>
        <span className="text-sm tabular-nums">{dataRate} ms</span>
      </div>

      <label className="flex items-center gap-2 ml-4 text-sm">
        <input type="checkbox" checked={anomalyDetection} onChange={e => setAnomaly(e.target.checked)} />
        <Activity size={16}/> Anomaly detection
      </label>

      <div className="ml-auto text-sm">
        <span className="font-medium">Time:</span> <span className="tabular-nums">{time}s</span>
      </div>
    </div>
  );
};

export default ControlToolbar;
