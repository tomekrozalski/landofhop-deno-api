import { MongoClient } from "mongo";
import { Basics as BasicsTypes } from "/api/models/beverage/Basics.d.ts";
import { Beverage as BeverageTypes } from "/api/models/beverage/details/Beverage.d.ts";
import { Institution as InstitutionTypes } from "/api/models/Institution.d.ts";
import { Place as PlaceTypes } from "/api/models/Place.d.ts";
import { Session as SessionTypes } from "/api/models/Session.d.ts";
import { User as UserTypes } from "/api/models/User.d.ts";

const client = new MongoClient();

await client.connect({
  db: "landofhop",
  tls: true,
  servers: [
    {
      host: "landofhop-shard-00-00.ku9ye.mongodb.net",
      port: 27017,
    },
    {
      host: "landofhop-shard-00-01.ku9ye.mongodb.net",
      port: 27017,
    },
    {
      host: "landofhop-shard-00-02.ku9ye.mongodb.net",
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
const institutions = db.collection<InstitutionTypes>("institutions");
const places = db.collection<PlaceTypes>("places");
const sessions = db.collection<SessionTypes>("sessions");
const users = db.collection<UserTypes>("users");

export { basics, beverages, institutions, places, sessions, users };
