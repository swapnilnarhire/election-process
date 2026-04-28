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

module.exports = {
  getConfig,
  getElectionProcess,
  getTimeline,
  getFaqs,
};
