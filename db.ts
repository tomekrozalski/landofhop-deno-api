import { MongoClient } from "https://deno.land/x/mongo@v0.25.0/mod.ts";

const client = new MongoClient();

await client.connect({
  db: "landofhop",
  tls: true,
  servers: [
    {
      host: "landofhop-shard-00-01.ku9ye.mongodb.net",
      port: 27017,
    },
  ],
  credential: {
    username: Deno.env.get("MONGODB_USERNAME"),
    password: Deno.env.get("MONGODB_PASSWORD"),
    db: "admin",
    mechanism: "SCRAM-SHA-1",
  },
});

const db = client.database("landofhop");
const beverages = db.collection<{ badge: string }>("beverages");

export { beverages };
