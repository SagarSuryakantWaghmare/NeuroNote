import { NextFunction, Request,Response } from "express";
import  jwt  from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";
// Add global declaration for Express Request
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers["authorization"];
        
        if (!header) {
            res.status(401).json({
                message: "Authorization header missing"
            });
            return;
        }
        
        const decoded = jwt.verify(header as string, JWT_PASSWORD);
        if (decoded) {
            // Type-safe now with global declaration
            req.userId = (decoded as any).id;
            next();
        } else {
            res.status(403).json({
                message: "You are not logged in"
            });
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(403).json({
            message: "Authentication failed"
        });
    }
}
// Override the types of the express request object
