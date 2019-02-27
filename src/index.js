import { GraphQLServer, PubSub } from "graphql-yoga";

import db from "./db";

import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Posts from "./resolvers/Posts";
import Comments from "./resolvers/Comments";

import Subscription from "./resolvers/Subscription";

// Type Definitions [schema]
// const typeDefs = `

//   `;

const pubsub = new PubSub();

// Resolvers
const resolvers = {
  Query: Query,
  Mutation: Mutation,
  Subscription: Subscription,
  User: User,
  Posts: Posts,
  Comments: Comments
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: resolvers,
  context: {
    db: db,
    pubsub: pubsub
  }
});

server.start(() => {
  console.log("The server is running.");
});
