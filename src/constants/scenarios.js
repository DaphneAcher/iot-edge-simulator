// src/constants/scenarios.js
export const SCENARIOS = {
  traffic: {
    name: "Traffic Management",
    icon: "StretchHorizontal",
    description: "Cars, speed, pedestrian flow across an intersection",
    sensors: [
      { id: 'vehicle_count', name: 'Vehicles', unit: 'cars', initial: 5, range: 10, threshold: 3 },
      { id: 'speed', name: 'Avg Speed', unit: 'mph', initial: 35, range: 20, threshold: 10 },
      { id: 'pedestrians', name: 'Pedestrians', unit: 'people', initial: 2, range: 8, threshold: 5 }
    ],
    events: [
      { name: 'Traffic jam', probability: 0.03, effect: d => ({ vehicle_count: d.vehicle_count + 15, speed: d.speed - 20 }) },
      { name: 'Fender bender', probability: 0.01, effect: d => ({ vehicle_count: d.vehicle_count + 8, speed: d.speed - 25 }) }
    ],
    accent: '#2563eb'
  },
  industrial: {
    name: "Industrial Machine Monitoring",
    icon: "Cog",
    description: "Vibration, temperature, and pressure on a production line",
    sensors: [
      { id: 'vibration', name: 'Vibration', unit: 'Hz', initial: 50, range: 10, threshold: 15 },
      { id: 'pressure', name: 'Pressure', unit: 'PSI', initial: 100, range: 20, threshold: 25 },
      { id: 'temp', name: 'Temperature', unit: '°C', initial: 75, range: 15, threshold: 20 }
    ],
    events: [
      { name: 'Bearing wear', probability: 0.02, effect: d => ({ vibration: d.vibration + 30, temp: d.temp + 15 }) },
      { name: 'Pressure spike', probability: 0.025, effect: d => ({ pressure: d.pressure + 40 }) }
    ],
    accent: '#dc2626'
  },
  agriculture: {
    name: "Smart Agriculture",
    icon: "Sprout",
    description: "Soil, pH, nutrients for irrigation decisions",
    sensors: [
      { id: 'moisture', name: 'Moisture', unit: '%', initial: 45, range: 20, threshold: 15 },
      { id: 'ph', name: 'Soil pH', unit: '', initial: 6.5, range: 1, threshold: 0.5 },
      { id: 'nitrogen', name: 'Nitrogen', unit: 'ppm', initial: 20, range: 10, threshold: 8 }
    ],
    events: [
      { name: 'Heavy rain', probability: 0.015, effect: d => ({ moisture: d.moisture + 25, nitrogen: d.nitrogen - 5 }) },
      { name: 'Dry spell', probability: 0.01, effect: d => ({ moisture: d.moisture - 20 }) }
    ],
    accent: '#059669'
  },
  security: {
    name: "Smart Security System",
    icon: "ScanFace",
    description: "People/vehicles detected + ambient noise anomalies",
    sensors: [
      { id: 'people', name: 'People', unit: 'count', initial: 0, range: 5, threshold: 3 },
      { id: 'vehicles', name: 'Vehicles', unit: 'count', initial: 0, range: 3, threshold: 2 },
      { id: 'noise', name: 'Noise', unit: 'dB', initial: 40, range: 20, threshold: 15 }
    ],
    events: [
      { name: 'Intruder', probability: 0.02, effect: d => ({ people: d.people + 3, noise: d.noise + 30 }) },
      { name: 'Suspicious vehicle', probability: 0.015, effect: d => ({ vehicles: d.vehicles + 2, noise: d.noise + 15 }) }
    ],
    accent: '#ea580c'
  }
};
