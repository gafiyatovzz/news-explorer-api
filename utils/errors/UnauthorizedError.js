class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statuseCode = 401;
    }
}

module.exports = UnauthorizedError;
