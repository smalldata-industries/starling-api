const { connect, close } = require('./sqlite');
const {
  insertFile,
  updateFile,
  getStoredFileList,
  getStorageSpace,
  getQueuedFileList,
  getActiveFileList,
  getQueuedFilesInfo,
  getRetryFiles,
  getStorageDeals,
  updateFileStatus,
  getVerifyList,
  getRetrievalFileInfo,
  getJobStatus
} = require('./functions');

module.exports = {
  connect,
  close,
  insertFile,
  updateFile,
  getStoredFileList,
  getStorageSpace,
  getQueuedFileList,
  getActiveFileList,
  getQueuedFilesInfo,
  getRetryFiles,
  getStorageDeals,
  updateFileStatus,
  getVerifyList,
  getRetrievalFileInfo,
  getJobStatus
};
