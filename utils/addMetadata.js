const fs = require("fs-extra");
const path = require("path");
const serverConstants = require("../constants/serverConstants");

const addMetadata = async (file, metaData) => {
  try {
    const filePath = path.join(serverConstants.LOCATION, file);
    const stats = await fs.stat(filePath);
    metaData["name"] = path.basename(filePath);
    metaData["size"] = (stats.size / (1024 * 1024)).toFixed(2);
    const metadataContent = JSON.stringify(metaData);
    console.log(stats, metadataContent);
    await fs.appendFile(filePath, `\n/* Metadata: ${metadataContent} */`);
  } catch (error) {
    console.error(`Error adding metadata for file ${file}: ${error.message}`);
    return null;
  }
};

module.exports = { addMetadata };
