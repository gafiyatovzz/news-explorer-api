class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statuseCode = 400;
  }
}

module.exports = BadRequestError;
