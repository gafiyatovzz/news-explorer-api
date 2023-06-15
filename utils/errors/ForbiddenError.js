class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statuseCode = 401;
  }
}

module.exports = ForbiddenError;
