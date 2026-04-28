const { readJsonFile } = require('../utils/fileReader');

const getElectionProcess = async () => {
  const db = await readJsonFile('db.json');
  return db.process.sort((a, b) => a.order - b.order); // Ensure ordered output
};

const getTimeline = async () => {
  const db = await readJsonFile('db.json');
  return db.timeline.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
};

const getFaqs = async () => {
  const db = await readJsonFile('db.json');
  return db.faq;
};

module.exports = {
  getElectionProcess,
  getTimeline,
  getFaqs,
};
