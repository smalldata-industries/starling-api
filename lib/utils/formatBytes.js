function formatBytes(bytes, decimals = 2) {
  if (bytes === 0 || !bytes) return '0 Bytes';

  const d = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(d));

  return parseFloat((bytes / Math.pow(d, i)).toFixed(dm)) + ' ' + sizes[i];
}

module.exports = {
  formatBytes
};
