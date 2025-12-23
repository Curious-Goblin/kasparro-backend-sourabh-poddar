import { app } from "./api/app.js";
import { config } from "./core/config.js";
import {runETL} from "./ingestion/runner.js"

app.listen(config.port, async () => {
  console.log(`Server running on port ${config.port}`);

  await runETL();
});
