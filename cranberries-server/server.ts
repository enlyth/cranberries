import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typedefs";
import resolvers from "./graphql/resolvers";
import * as dotenv from "dotenv";
import { initializeDatabase } from "./db/db";
import * as cors from "cors";

dotenv.config();

initializeDatabase();

const PORT = process.env.PORT || 4000;

const expressServer = express();
expressServer.use(cors());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      "request.credentials": "same-origin"
    }
  }
});

apolloServer.applyMiddleware({ app: expressServer });

expressServer.listen({ port: PORT }, () => {
  console.log(`❤️  Server ready at http://localhost:${PORT}`);
});
