import {Request, Response, NextFunction} from "express";
import {authService} from "../domain/users-service";

enum BaseAuthPayload {
    login = 'admin',
    password = 'qwerty'
}



export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.send(401);
        return;
    }

    if (req.headers.authorization.split(" ")[0] !== "Basic") {
        res.send(401);
        return;
    }

    const token = req.headers.authorization.split(" ")[1];
    const decodedBaseData = authService.decodeBaseAuth(token);

    if (
        (decodedBaseData.login !== BaseAuthPayload.login &&
        decodedBaseData.password !== BaseAuthPayload.password)
    ) {
        res.send(401);
        return;
    }

    next();
}

