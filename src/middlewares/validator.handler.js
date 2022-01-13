import boom from '@hapi/boom';

export function validatorHandler(filter) {
  return function (req, res, next) {
    const data = req[filter.property];
    const { error } = filter.schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}
