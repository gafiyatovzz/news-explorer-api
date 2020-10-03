class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statuseCode = 403;
  }
}

module.exports = ForbiddenError;
