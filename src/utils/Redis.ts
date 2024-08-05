import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export let redisClient: any;

(async () => {
  try {
    redisClient = new Redis(
      `rediss://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_ENDPOINT}:${process.env.REDIS_PORT}`
    );
    console.log("redis connected");
  } catch (error) {
    console.log("error in connectiong to redis");
  }
})();
