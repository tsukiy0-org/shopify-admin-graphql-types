const { exec } = require("child_process");
const { promisify } = require("util");
const path = require("path");

const execP = promisify(exec);

(async () => {
  const versions = [
    "2020-04",
    "2020-07",
    "2020-10",
    "2021-01",
    "2021-04",
    "2021-07",
  ];

  await Promise.all(versions.map(async version => {
    const configPath = path.resolve(__dirname, "configs", version, "codegen.yml");

    const { stdout, stderror } = await execP(`yarn graphql-codegen --config ${configPath}`);

    console.log(stdout);
    console.error(stderror);
  }));
})();
