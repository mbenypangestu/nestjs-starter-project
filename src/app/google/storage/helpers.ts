import { Storage } from '@google-cloud/storage';

export const path = require('path');
export const serviceKey = path.join(
  './src/app/google/client/jeniuskids-endang-project.json',
);

export const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'endang',
});
