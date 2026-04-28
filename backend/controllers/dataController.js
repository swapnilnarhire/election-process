const dataService = require('../services/dataService');

const sendResponse = (res, data) => {
  res.json({
    success: true,
    data,
    error: null,
  });
};

const getConfig = async (req, res, next) => {
  try {
    const data = await dataService.getConfig();
    sendResponse(res, data);
  } catch (error) {
    next(error);
  }
};

const getProcess = async (req, res, next) => {
  try {
    const data = await dataService.getElectionProcess(req.query.method);
    sendResponse(res, data);
  } catch (error) {
    next(error);
  }
};

const getTimeline = async (req, res, next) => {
  try {
    const data = await dataService.getTimeline(req.query.method);
    sendResponse(res, data);
  } catch (error) {
    next(error);
  }
};

const getFaqs = async (req, res, next) => {
  try {
    const data = await dataService.getFaqs(req.query.method);
    sendResponse(res, data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConfig,
  getProcess,
  getTimeline,
  getFaqs,
};
