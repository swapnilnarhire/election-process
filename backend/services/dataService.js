const { readJsonFile } = require('../utils/fileReader');

const getConfig = async () => {
  const db = await readJsonFile('db.json');
  return db.config;
};

const getElectionProcess = async (method) => {
  const db = await readJsonFile('db.json');
  let process = db.process.sort((a, b) => a.priority - b.priority);
  if (method) {
    process = process.filter(p => p.methods.includes(method));
  }
  return process;
};

const getTimeline = async (method) => {
  const db = await readJsonFile('db.json');
  let timeline = db.timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
  if (method) {
    timeline = timeline.filter(t => t.methods.includes(method));
  }
  return timeline;
};

const getFaqs = async (method) => {
  const db = await readJsonFile('db.json');
  let faq = db.faq.sort((a, b) => a.priority - b.priority);
  if (method) {
    faq = faq.filter(f => f.methods.includes(method));
  }
  return faq;
};

const getCandidates = async (filters = {}) => {
  const db = await readJsonFile('db.json');
  let candidates = db.candidates || [];

  // Filter by Party
  if (filters.party) {
    candidates = candidates.filter(c => c.party === filters.party);
  }

  // Filter by Constituency
  if (filters.constituency) {
    candidates = candidates.filter(c => c.constituency.toLowerCase().includes(filters.constituency.toLowerCase()));
  }

  // Geo-query (Radius Search)
  if (filters.lat && filters.lng && filters.radius) {
    const lat = parseFloat(filters.lat);
    const lng = parseFloat(filters.lng);
    const radius = parseFloat(filters.radius); // In km

    candidates = candidates.filter(c => {
      const distance = getDistance(lat, lng, c.location.lat, c.location.lng);
      return distance <= radius;
    });
  }

  return candidates.sort((a, b) => a.priority - b.priority);
};

// Helper function for Haversine distance
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

module.exports = {
  getConfig,
  getElectionProcess,
  getTimeline,
  getFaqs,
  getCandidates,
};
