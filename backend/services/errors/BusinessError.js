class BusinessError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        this.name = "BussinessError";
    }
}

class AuthError extends BusinessError {
    constructor(message) {
        super(message);
        this.status = 401;
        this.name = "AuthError";
    }
}

class ForbiddenError extends BusinessError {
    constructor(message) {
        super(message);
        this.status = 403;
        this.name = "ForbiddenError";
    }
}

class NotFounndError extends BusinessError {
    constructor(message) {
        super(message);
        this.status = 404;
        this.name = "NotFounndError";
    }
}

module.exports = { BusinessError, AuthError, ForbiddenError, NotFounndError };