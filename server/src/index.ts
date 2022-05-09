import "reflect-metadata"; // typeorm
import "dotenv/config";
import { createConnection } from "typeorm";
import path from "path";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import cors from "cors";
import { Contact } from "./entities/Contact";
import { ContactResolver } from "./resolvers/contact";

const main = async () => {
    const connection = await createConnection({
        type: "postgres",
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [Contact],
    });

    // await connection.runMigrations();

    const app = express();

    app.use(
        cors({
            origin: ["http://localhost:3000", "https://studio.apollographql.com"],
            credentials: true,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, ContactResolver],
            validate: false,
        }),
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    app.listen(4000, () => {
        console.log("🚀 Server ready at http://localhost:4000/");
    });
};

main();