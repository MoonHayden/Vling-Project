const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

const express = require("express");
const http = require("http");
const morgan = require("morgan");
require("dotenv").config();

const { typeDefs } = require("./labeling/schemas");
const { resolvers } = require("./labeling/resolvers");

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });
  await server.start();

  app.use(morgan("dev"));
  // app.use(express.json());

  server.applyMiddleware({
    app,
    cors: true,
    onHealthCheck: () =>
      new Promise((resolve, reject) => {
        console.log("health check should failed but this is never called");
        reject("booooo");
      }),
  });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(
    `✅ Server ready at http://localhost:4000${server.graphqlPath} 🚀`
  );
}
startApolloServer(typeDefs, resolvers);
