import sequelize from '../libs/sequelize';
import boom from '@hapi/boom';
const MediaContent = sequelize.models.MediaContent;
export class MediaContentService {
  async create(data) {
    const mediaContent = await MediaContent.create(data);
    return mediaContent;
  }
}
