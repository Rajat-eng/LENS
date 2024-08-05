import { Request, Response, NextFunction } from "express";

import { redisClient } from "../utils/Redis";
import { ErrorHandler } from "../utils/ErrorHandler";

interface RateLimiterRule {
  endpoint: string;
  rate_limit: {
    time: number;
    limit: number;
  };
}

export const rateLimiter = (rule: RateLimiterRule) => {
  const { endpoint, rate_limit } = rule;

  return async (req: Request, res: Response, next: NextFunction) => {
    const ipAddress = req.ip;
    const redisId = `${endpoint}/${ipAddress}`;

    const requests = await redisClient.incr(redisId);
    if (requests === 1) {
      await redisClient.expire(redisId, rate_limit.time);
    }

    if (requests > rate_limit.limit) {
      return next(
        new ErrorHandler("Too Many Request. Try After some time", 429)
      );
    }

    next();
  };
};
