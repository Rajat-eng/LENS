import express, { Express } from "express";
import dotenv from "dotenv";
import { ErrorMiddleware } from "./middleware/error.middleware";
import mainRouter from "./routes/index";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
dotenv.config();

const app: Express = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

const port = process.env.PORT || 3000;
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "A simple Express API",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/entity/*.ts"], // Files containing annotations as above
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/v1", mainRouter);
app.use(ErrorMiddleware);

export default app;
