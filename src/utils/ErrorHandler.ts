export class ErrorHandler extends Error {
  statusCode: Number;
  constructor(message: string, statusCode: Number) {
    super(message);
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}
