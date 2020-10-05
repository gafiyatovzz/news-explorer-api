class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statuseCode = 500;
  }
}

module.exports = ServerError;
