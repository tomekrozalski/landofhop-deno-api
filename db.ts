import { MongoClient } from "mongo";
import { Basics as BasicsTypes } from "/api/models/beverage/Basics.d.ts";
import { Beverage as BeverageTypes } from "/api/models/beverage/details/Beverage.d.ts";
import { User as UserTypes } from "/api/models/User.d.ts";

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
const basics = db.collection<BasicsTypes>("basics");
const beverages = db.collection<BeverageTypes>("beverages");
const users = db.collection<UserTypes>("users");

export { basics, beverages, users };
