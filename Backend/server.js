const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const route = require('./util/uploadCSV');

const { typeDefs } = require("./src/schemas");
const { resolvers } = require("./src/resolvers");

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
  
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(route);
  
  server.applyMiddleware({ app });
  
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(
    `✅ Server ready at http://localhost:4000${server.graphqlPath} 🚀`
  );
}
startApolloServer(typeDefs, resolvers);
