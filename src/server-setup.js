import * as express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import checkAuthJwt from "./routes/auth";
import { sendContactSupportEmail } from "./routes/email";
import swaggerUi from "swagger-ui-express";
import { swaggerDoc } from "../swagger";
require("dotenv").config();

import publicRouter from "./routes/public";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import wishRouter from "./routes/wish";

const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// using cookieParser to parse cookies into JS objects
app.use(cookieParser());

// makes sure the server can receive json as a request body
app.use(express.json());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

const serverConfig = {
  port: process.env.SERVER_PORT,
};

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw "Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file";
}

const initServer = () => {
  // Public Routes
  app.use(publicRouter);

  app.get("/api/public", function (req, res) {
    res.json({
      message:
        "Hello from a public endpoint! You don't need to be authenticated to see this.",
    });
  });
  app.post("/api/send-email", sendContactSupportEmail);

  app.use("/api/posts", postRouter);

  app.use("/api/wishes", wishRouter);

  //Auth (Auth0)
  // app.use(checkAuthJwt);

  // Private Routes
  app.use("/api/users", userRouter);

  app.get("/api/private", function (req, res) {
    res.json({
      message:
        "Hello from a private endpoint! You need to be authenticated to see this.",
    });
  });

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  // Run up server
  app.listen(serverConfig.port, () => {
    console.log(
      `>>>>> Server started, ready and running at http://localhost: ${serverConfig.port}`
    );
  });
};

export default initServer;
