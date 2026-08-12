import {rateLimit} from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "too many request please try again after sometime",
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: "too many request please try again after sometime",
});


export default rateLimiter