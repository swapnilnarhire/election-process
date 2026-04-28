const dataService = require('../services/dataService');

const sendResponse = (res, data) => {
  res.json({
    success: true,
    data,
    error: null,
  });
};

const getProcess = async (req, res, next) => {
  try {
    const data = await dataService.getElectionProcess();
    sendResponse(res, data);
  } catch (error) {
    next(error);
  }
};

const getTimeline = async (req, res, next) => {
  try {
    const data = await dataService.getTimeline();
    sendResponse(res, data);
  } catch (error) {
    next(error);
  }
};

const getFaqs = async (req, res, next) => {
  try {
    const data = await dataService.getFaqs();
    sendResponse(res, data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProcess,
  getTimeline,
  getFaqs,
};
