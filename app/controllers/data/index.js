const { getData, downloadFile } = require("./getData");
const { deleteData } = require("./deleteData");
const { uploadMetadata, uploadFiles } = require("./uploadData");

module.exports = {
  getData,
  deleteData,
  uploadMetadata,
  uploadFiles,
  downloadFile,
};
