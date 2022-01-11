import boom from '@hapi/boom';

export function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

export function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

export function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

export function sendServerErrorHandler() {
  res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
}
