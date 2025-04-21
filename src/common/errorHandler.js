export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends CustomError {
    constructor(message = "Bad request") {
        super(message, 400);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

export class ForbiddenError extends CustomError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}

export class UserNotFoundError extends CustomError {
    constructor(message = "User not found") {
        super(message, 404);
    }
}

export class ConflictError extends CustomError {
    constructor(message = "Resource conflict") {
        super(message, 409);
    }
}

export class ValidationError extends CustomError {
    constructor(message = "Validation failed", errors = []) {
        super(message, 422);
        this.errors = errors; // Array of validation errors
    }
}

export class InternalServerError extends CustomError {
    constructor(message = "Internal server error") {
        super(message, 500);
    }
}