import { MediaContent, mediaContentSchema } from './mediaContent.model';

export function setupModels(sequelize) {
  MediaContent.init(mediaContentSchema, MediaContent.config(sequelize));
}
