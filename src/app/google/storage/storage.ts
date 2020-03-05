import { format } from 'path';
import { storage } from './helpers';
import * as moment from 'moment';
import { async } from 'rxjs/internal/scheduler/async';

export const uploadFile = async (bucket_name, file, folder, name: string) =>
  new Promise((resolve, reject) => {
    let uri: string = null;
    const { buffer, originalname } = file;
    const file_name: string = originalname;
    const extension: string = file_name.substr(file_name.lastIndexOf('.') + 1);
    const stored_name: string =
      moment().format('YYYYMMddHHmmss') +
      '_' +
      name.replace(/ /g, '_').toLowerCase() +
      '.' +
      extension;

    const bucket = storage.bucket(bucket_name);
    const file_bucket = bucket.file(folder + stored_name);

    const imgUploaded = file_bucket
      .createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
        resumable: false,
        predefinedAcl: 'publicRead',
      })
      .on('error', err => {
        console.log(err);
        reject(null);
      })
      .on('finish', () => {
        uri =
          'https://storage.cloud.google.com/jeniuskids-storage/' +
          folder +
          stored_name;
        resolve(uri);
      })
      .end(buffer);
  });
