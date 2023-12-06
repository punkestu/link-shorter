import HttpStatus from "http-status-codes";

export class Err extends Error {
    code: number;
    error: string;

    constructor(error: string, code: number) {
        super(error);
        this.code = code;
        this.error = error;
    }
}

export interface ErrFields {
    [field: string]: string[]
}

export class Errs extends Error {
    errors: ErrFields;
    code: number;

    constructor(code: number, errors: ErrFields) {
        super();
        this.code = code;
        this.errors = errors;
    }
}

export class ErrConflict extends Err {
    constructor(cause: string) {
        super(`conflict because ${cause}`, HttpStatus.CONFLICT);
    }
}

export class ErrNotFound extends Err {
    constructor(cause: string) {
        super(`not found because ${cause}`, HttpStatus.NOT_FOUND);
    }
}