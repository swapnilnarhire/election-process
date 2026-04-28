const fs = require('fs/promises');
const path = require('path');

/**
 * Reads a JSON file and parses it.
 * @param {string} filePath - Relative path from the 'data' directory.
 * @returns {Promise<Object>} Parsed JSON data.
 */
const readJsonFile = async (filePath) => {
  try {
    const fullPath = path.join(__dirname, '../data', filePath);
    const data = await fs.readFile(fullPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw new Error(`Could not read data from ${filePath}`);
  }
};

module.exports = {
  readJsonFile,
};
