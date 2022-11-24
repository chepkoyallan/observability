import { loadConfigs } from "./configs";
import { UIServer } from "./app";

const configs = loadConfigs(process.argv, process.env);

if (process.env.NODE_ENV !== "test") {
  console.log({
    ...configs,
    artifacts: "Artifacts config contains credentials, so it is omitted"
  });
}
const app = new UIServer(configs);
app.start();
