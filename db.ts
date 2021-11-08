import { MongoClient } from "mongo";
import { Basics as BasicsTypes } from "/api/models/beverage/Basics.d.ts";
import { Beverage as BeverageTypes } from "/api/models/beverage/details/Beverage.d.ts";
import { Ingredient as IngredientTypes } from "/api/models/Ingredient.d.ts";
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
      host: Deno.env.get("MONGODB_SHARD_0") as string,
      port: Number(Deno.env.get("MONGODB_SHARD_PORT")),
    },
    {
      host: Deno.env.get("MONGODB_SHARD_1") as string,
      port: Number(Deno.env.get("MONGODB_SHARD_PORT")),
    },
    {
      host: Deno.env.get("MONGODB_SHARD_2") as string,
      port: Number(Deno.env.get("MONGODB_SHARD_PORT")),
    },
  ],
  credential: {
    username: Deno.env.get("MONGODB_USERNAME"),
    password: Deno.env.get("MONGODB_PASSWORD"),
    db: "landofhop",
    mechanism: "SCRAM-SHA-1",
  },
});

const db = client.database("landofhop");
const basics = db.collection<BasicsTypes>("basics");
const beverages = db.collection<BeverageTypes>("beverages");
const ingredients = db.collection<IngredientTypes>("ingredients");
const institutions = db.collection<InstitutionTypes>("institutions");
const places = db.collection<PlaceTypes>("places");
const sessions = db.collection<SessionTypes>("sessions");
const users = db.collection<UserTypes>("users");

export {
  basics,
  beverages,
  ingredients,
  institutions,
  places,
  sessions,
  users,
};
