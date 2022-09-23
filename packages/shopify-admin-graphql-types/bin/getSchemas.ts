import fetch from "node-fetch";
import * as path from "path";
import * as fs from "fs";

const getSchema = async (version: string): Promise<string> => {
  const res = await fetch("https://shopify.dev/admin-graphql-proxy", {
    method: "POST",
    body: JSON.stringify({
      graphQLParams: {
        query:
          "\n    query IntrospectionQuery {\n      __schema {\n        \n        queryType { name }\n        mutationType { name }\n        subscriptionType { name }\n        types {\n          ...FullType\n        }\n        directives {\n          name\n          description\n          \n          locations\n          args {\n            ...InputValue\n          }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      description\n      \n      fields(includeDeprecated: true) {\n        name\n        description\n        args {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        description\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      description\n      type { ...TypeRef }\n      defaultValue\n      \n      \n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                  ofType {\n                    kind\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ",
        operationName: "IntrospectionQuery",
      },
      version,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 200) {
    throw new Error(`failed to get ${version}`);
  }

  const data = await res.text();

  return data;
};

const main = async (): Promise<void> => {
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

  await Promise.all(
    versions.map(async (version) => {
      const schema = await getSchema(version);
      const savePath = path.resolve(
        __dirname,
        "../configs",
        version,
        "graphql.schema.json"
      );

      fs.writeFileSync(savePath, schema);
    })
  );
};

(async () => {
  await main();
})();
