import { exec } from "child_process"
import { promisify } from "util"
import * as path from "path"

const execP = promisify(exec);

(async () => {
  const versions = [
    "2020-04",
    "2020-07",
    "2020-10",
    "2021-01",
    "2021-04",
    "2021-07",
    "2021-10",
    "2022-01",
    "2022-07",
  ];

  await Promise.all(versions.map(async version => {
    const configPath = path.resolve(__dirname, "../configs", version, "codegen.yml");

    const { stdout, stderr } = await execP(`yarn graphql-codegen --config ${configPath}`);

    console.log(stdout);
    console.error(stderr);
  }));
})();
