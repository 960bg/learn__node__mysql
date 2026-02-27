const fs = require('fs');
const path = require('path');

fs.rmdir(path.join(__dirname, 'notes'), (err, data) => {
  if (err) throw err;
  console.log('data', data);
  console.log('Folder was del');
});
