import { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../../domain/errors/forbidden-error';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (!(req?.auth?.sessionClaims?.role !== "admin")) {
        throw new ForbiddenError("Forbidden");
    }

    next();
}