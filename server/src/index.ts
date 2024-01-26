import app from "./app";
import * as dotenv from "dotenv";
import config from "./config";

dotenv.config();

app.listen(config.port, () => {
  console.log(`server listening on port ${config.port}`);
});
