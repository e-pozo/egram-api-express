import sequelize from '../libs/sequelize';
import boom from '@hapi/boom';
import { uploadFileS3 } from '../libs/s3';
import util from 'util';
import fs from 'fs';
const unlinkFile = util.promisify(fs.unlink);
const MediaContent = sequelize.models.MediaContent;
export class MediaContentService {
  async create(data, file) {
    try {
      const mediaContent = await MediaContent.create({
        ...data,
        mediaKey: file.filename,
      });
      await uploadFileS3(file);
      return mediaContent;
    } catch (err) {
      throw err;
    } finally {
      await unlinkFile(file.path);
    }
  }
}
