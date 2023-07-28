const fs = require("fs-extra");
const path = require("path");
const serverConstants = require("../constants/serverConstants");

const readMetadata = async (file) => {
  try {
    const fileContent = await fs.readFile(
      serverConstants.LOCATION + "/" + file,
      "utf8"
    );

    // Find the start and end position of the metadata comment
    const startMarker = "/* Metadata: ";
    const endMarker = " */";
    const startIndex = fileContent.indexOf(startMarker);
    const endIndex = fileContent.indexOf(endMarker, startIndex);

    if (startIndex !== -1 && endIndex !== -1) {
      // Extract the metadata content between the markers
      const metadataContent = fileContent.substring(
        startIndex + startMarker.length,
        endIndex
      );

      // Parse the metadata content as JSON to get the metadata object
      const metadata = JSON.parse(metadataContent);

      return metadata;
    }
  } catch (error) {
    // Handle the error if the metadata file is not found or is invalid
    console.error(`Error reading metadata for file ${file}: ${error.message}`);
    return null;
  }
};

module.exports = { readMetadata };
