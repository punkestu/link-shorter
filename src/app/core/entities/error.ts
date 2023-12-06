import HttpStatus from "http-status-codes";

export class Err extends Error {
    field: string;
    code: number;
    msg: string;
    constructor(field: string, message: string, code: number) {
        super(`${field} is ${message}`);
        this.msg = message;
        this.field = field;
        this.code = code;
    }
}

export class ErrConflict extends Err {
    constructor(field: string) {
        super(field, "conflict", HttpStatus.CONFLICT);
    }
}

export class ErrNotFound extends Err {
    constructor(field: string) {
        super(field, "not found", HttpStatus.NOT_FOUND);
    }
}