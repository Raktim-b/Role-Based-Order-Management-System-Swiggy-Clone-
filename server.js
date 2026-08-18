require("dotenv").config();

const app = require("./src/app");
const logger = require("./src/utils/logger");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Server connected on port ${PORT}`);
});
