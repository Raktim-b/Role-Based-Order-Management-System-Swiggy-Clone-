require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const router = require("./routes");
const DbCon = require("./config/db");
const SwaggerOptions = require("../swagger.json");

const app = express();
const swaggerDocument = swaggerJsDoc(SwaggerOptions);

// Database
DbCon();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", router);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
