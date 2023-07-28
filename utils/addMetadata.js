const fs = require("fs-extra");
const path = require("path");

const addMetadata = async (file, metaData) => {
  console.log(file, metaData);

  try {
    const filePath = file.path;
    const stats = await fs.stat(filePath);
    console.log(stats);
    const metadataContent = JSON.stringify(metaData);

    await fs.appendFile(filePath, `\n/* Metadata: ${metadataContent} */`);
  } catch (error) {
    console.error(`Error adding metadata for file ${file}: ${error.message}`);
    return null;
  }
};

module.exports = { addMetadata };
