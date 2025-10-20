import React, { useState, useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Play, Pause, RotateCcw, Wifi, Server } from "lucide-react";

export default function IoTEdgeSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [cloudData, setCloudData] = useState([]);
  const [edgeData, setEdgeData] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(20);
  const [currentMotion, setCurrentMotion] = useState(false);
  const [lastSentTemp, setLastSentTemp] = useState(20);
  const [cloudPackets, setCloudPackets] = useState(0);
  const [edgePackets, setEdgePackets] = useState(0);
  const [tempThreshold, setTempThreshold] = useState(2);
  const [dataRate, setDataRate] = useState(500);

  // Reset simulation
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setCloudData([]);
    setEdgeData([]);
    setCurrentTemp(20);
    setLastSentTemp(20);
    setCurrentMotion(false);
    setCloudPackets(0);
    setEdgePackets(0);
  };

  // Simulate sensor readings
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((t) => {
        const newTime = t + 1;

        // Simulate temperature changes (small fluctuations)
        const tempChange = (Math.random() - 0.5) * 0.5;
        const newTemp = parseFloat((currentTemp + tempChange).toFixed(2));
        setCurrentTemp(newTemp);

        // Simulate motion detection (random events)
        const motionDetected = Math.random() < 0.05; // 5% chance
        setCurrentMotion(motionDetected);

        // Cloud approach: send every reading
        setCloudPackets((c) => c + 1);

        // Edge approach: only send if threshold exceeded or motion detected
        let edgeSent = false;
        if (Math.abs(newTemp - lastSentTemp) >= tempThreshold || motionDetected) {
          setEdgePackets((e) => e + 1);
          setLastSentTemp(newTemp);
          edgeSent = true;
        }

        // Update chart data every 10 intervals
        if (newTime % 10 === 0) {
          setCloudData((prev) =>
            [...prev, {
              time: newTime,
              packets: cloudPackets + 10,
              bandwidth: (cloudPackets + 10) * 0.1, // KB
            }].slice(-30)
          );

          setEdgeData((prev) => {
            const nextPackets = edgePackets + (edgeSent ? 1 : 0);
            return [...prev, {
              time: newTime,
              packets: nextPackets,
              bandwidth: nextPackets * 0.1, // KB
            }].slice(-30);
          });
        }

        return newTime;
      });
    }, dataRate);

    return () => clearInterval(interval);
  }, [
    isRunning,
    currentTemp,
    lastSentTemp,
    tempThreshold,
    cloudPackets,
    edgePackets,
    dataRate,
  ]);

  const savings =
    cloudPackets > 0 ? ((1 - edgePackets / cloudPackets) * 100).toFixed(1) : 0;

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      {/* Header */}
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            IoT Edge Computing Simulation
          </h1>
          <p className="text-sm text-gray-500">
            Cloud-only vs Edge (bandwidth comparison)
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isRunning ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {isRunning ? "Running" : "Paused"}
        </span>
      </div>

      {/* Controls */}
      <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsRunning((v) => !v)}
            className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black/80"
          >
            {isRunning ? (
              <>
                <Pause size={18} /> Pause
              </>
            ) : (
              <>
                <Play size={18} /> Start
              </>
            )}
          </button>

        <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300"
          >
            <RotateCcw size={18} /> Reset
          </button>

          <div className="ml-auto text-sm text-gray-500">
            Time: <span className="font-medium text-gray-900">{time}s</span>
          </div>
        </div>

        <div className="my-4 h-px w-full bg-gray-200" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Temperature Threshold (°C): {tempThreshold}
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={tempThreshold}
              onChange={(e) => setTempThreshold(parseFloat(e.target.value))}
              className="mt-3 w-full"
              disabled={isRunning}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Data Rate (ms): {dataRate}
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={dataRate}
              onChange={(e) => setDataRate(parseInt(e.target.value))}
              className="mt-3 w-full"
              disabled={isRunning}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-base font-semibold">Current Sensor Data</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Temperature</span>
              <span className="text-lg font-semibold">{currentTemp}°C</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Motion</span>
              <span
                className={`text-sm font-medium ${
                  currentMotion ? "text-red-600" : "text-gray-400"
                }`}
              >
                {currentMotion ? "Detected" : "None"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Temp Δ since last send</span>
              <span className="font-medium">
                {Math.abs(currentTemp - lastSentTemp).toFixed(2)}°C
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-base font-semibold">Bandwidth Savings</h3>
          <div className="mb-4 text-center">
            <div className="text-4xl font-bold">{savings}%</div>
            <div className="text-xs text-gray-500">Data reduction</div>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Cloud Packets</span>
              <span className="font-medium">{cloudPackets}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Edge Packets</span>
              <span className="font-medium">{edgePackets}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Packets Saved</span>
              <span className="font-medium">{cloudPackets - edgePackets}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            <h3 className="text-base font-semibold">Cloud-only</h3>
          </div>
          <div className="flex items-center justify-around py-6 text-sm">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border text-xs font-medium">
                ESP32
              </div>
              <div className="mt-1 text-xs text-gray-500">Sensor</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl">→</div>
              <div className="text-[10px] font-semibold text-red-600">ALL DATA</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border text-xl">
                ☁️
              </div>
              <div className="mt-1 text-xs text-gray-500">Cloud</div>
            </div>
          </div>
          <p className="rounded-md border bg-gray-50 p-3 text-xs text-gray-600">
            Sends every reading to cloud. Higher bandwidth.
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <Server className="h-4 w-4" />
            <h3 className="text-base font-semibold">Edge computing</h3>
          </div>
          <div className="flex items-center justify-around py-6 text-sm">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border text-xs font-medium">
                ESP32
              </div>
              <div className="mt-1 text-xs text-gray-500">Sensor</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl">→</div>
              <div className="text-[10px] text-gray-500">all data</div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border text-xs font-medium">
                RPi
              </div>
              <div className="mt-1 text-xs text-gray-500">Edge</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl">→</div>
              <div className="text-[10px] font-semibold text-emerald-600">
                FILTERED
              </div>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border text-xl">
                ☁️
              </div>
              <div className="mt-1 text-xs text-gray-500">Cloud</div>
            </div>
          </div>
          <p className="rounded-md border bg-gray-50 p-3 text-xs text-gray-600">
            Filters at the edge; forwards only important events.
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-base font-semibold">Cumulative Bandwidth (KB)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" type="number" domain={["dataMin", "dataMax"]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                data={cloudData}
                type="monotone"
                dataKey="bandwidth"
                stroke="#ef4444"
                name="Cloud-only"
                strokeWidth={2}
                dot={false}
              />
              <Line
                data={edgeData}
                type="monotone"
                dataKey="bandwidth"
                stroke="#10b981"
                name="Edge"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-base font-semibold">Total Packets</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: "Cloud-only", packets: cloudPackets },
                { name: "Edge", packets: edgePackets },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="packets" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 rounded-lg border bg-white p-6 text-sm text-gray-700">
        <p className="font-medium text-gray-900">How it works</p>
        <ul className="ml-5 mt-2 list-disc space-y-1">
          <li>
            <span className="font-medium text-gray-900">Cloud-only:</span>{" "}
            ESP32 sends every temperature reading to the cloud.
          </li>
          <li>
            <span className="font-medium text-gray-900">Edge:</span> RPi filters
            and forwards only when Δ≥{tempThreshold}°C or motion is detected.
          </li>
          <li>Adjust threshold to see savings; lower data rate = faster simulation.</li>
        </ul>
      </div>
    </div>
  );
}
