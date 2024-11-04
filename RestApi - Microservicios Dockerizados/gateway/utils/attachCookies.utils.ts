import {Request, Response,NextFunction} from "express";

const attachCookiesMiddleware = (req:Request) => {
    const cookies = req.cookies; 
    const cookieArray = Object.entries(cookies) 
        .map(([key, value]) => `${key}=${value}`) 
        .join('; '); 

    return cookieArray
};

export default attachCookiesMiddleware