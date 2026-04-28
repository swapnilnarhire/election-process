const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Health Check Endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: { status: 'OK', timestamp: new Date() },
    error: null,
  });
});

// API Routes
router.get('/config', dataController.getConfig);
router.get('/process', dataController.getProcess);
router.get('/timeline', dataController.getTimeline);
router.get('/faq', dataController.getFaqs);

module.exports = router;
