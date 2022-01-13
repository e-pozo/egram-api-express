import Joi from 'joi';

const id = Joi.number().integer().positive();
const title = Joi.string().max(100);
const description = Joi.string().max(5000);
const disclosureDate = Joi.date();
const accessStatus = Joi.string().allow('PUBLIC', 'PRIVATE', 'FRIENDS');

export const dataFilterToCU = {
  schema: Joi.object({
    title,
    description,
    disclosureDate,
    accessStatus,
  }),
  property: 'body',
};
