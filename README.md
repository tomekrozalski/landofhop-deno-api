# Land of Hop, Deno API

🗓️ 13.09.2021

My fourth attempt to build perfect REST API for the Land of Hop beer catalogue application. I previously use to work on it using Node with Express, Nest and Fastify with Mongoose or Prisma. It was great, especially Fastify seems to me very easy, performant and readable, but I am looking for something even more simple. I believe Deno is the right choice.

## Developing

To open the project you need to have Deno installed on your device. You can use `deno` or `denon` if you wish to start the server:

```bash
denon run --allow-net --allow-read --allow-write --allow-run --allow-env --unstable --import-map=import_map.json server.ts
```

to build the project run:

```bash
deno bundle --import-map=import_map.json --unstable server.ts server.bundle.ts
```
