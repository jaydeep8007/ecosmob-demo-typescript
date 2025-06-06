import dotenv from "dotenv";
dotenv.config();

import express from "express";
import logger from "morgan";
import { get } from "./config/config";
import bodyParser from "body-parser";
import cors from "cors"; //For cross domain error
import timeout from "connect-timeout";
import session from "express-session";
import compress from "compression";

import cookieParser from "cookie-parser";

import sequelize from "./config/sequelize";

/* MAIN ROUTES */
import router from "./routes/main.route";

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Middleware
// app.use(cors());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"] }));
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

app.use(express.json());
app.use(logger("dev"));
// if (config.NODE_ENV === 'development') {
//     app.use(logger('development'));
// } else if (config.NODE_ENV === 'production') {
//     app.use(compress({ threshold: 2 }));
// }

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(logger('combined')); // Just uncomment this line to show logs.

/* =======   Settings for CORS ========== */
app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use(timeout(120000));
app.use(haltOnTimedout);

function haltOnTimedout(req: any, res: any, next: any) {
  if (!req.timedout) next();
}

/* MAIN ROUTES FOR APP */
app.use("/", router);

// Server configuration
const PORT = process.env.PORT || 3000;
/* CONNECT DATABASE AND START THE SERVER */
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    console.log("✅ MySQL models synced");

    /* SYNC THE MODELS (create tables if they don't exist) */
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log("App is listing on port " + PORT + " for demo node server");
});
