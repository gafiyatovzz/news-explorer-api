class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statuseCode = 404;
  }
}

module.exports = NotFoundError;
