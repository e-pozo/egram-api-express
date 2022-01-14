import boom from '@hapi/boom';
import { DEFAULT_PAG_LIMIT, DEFAULT_PAG_OFFSET } from './constants';
export function CRUDServiceClosure(Model) {
  return class CRUDService {
    async create(data) {
      const object = await Model.create(data);
      return object;
    }
    async find({ offset = DEFAULT_PAG_OFFSET, limit = DEFAULT_PAG_LIMIT }) {
      const objects = await Model.findAll({ offset, limit });
      return objects;
    }
    async findOne(id) {
      const object = await Model.findByPk(id);
      if (!object) throw boom.notFound(`${Model.name.toLowerCase()} not found`);
      return object;
    }
    async update(id, changes) {
      let object = await this.findOne(id);
      object = object.update(changes);
      return object;
    }
    async delete(id) {
      const object = await this.findOne(id);
      await object.destroy();
      return { id };
    }
  };
}
