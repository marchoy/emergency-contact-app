import "reflect-metadata"; // typeorm
import "dotenv-safe/config";
import { createConnection } from "typeorm";
import path from "path";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { Contact } from "./entities/Contact";
import { ContactResolver } from "./resolvers/contact";
import { PhoneNumber } from "./entities/PhoneNumber";
import { PhoneNumberResolver } from "./resolvers/phoneNumber";
import { __prod__ } from "./constants";

const main = async () => {
    await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [Contact, PhoneNumber],
    });

    // await connection.runMigrations();

    const app = express();

    app.use(
        cors({
            origin: __prod__ ? process.env.CORS_ORIGIN : [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN_APOLLO],
            credentials: true,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ContactResolver, PhoneNumberResolver],
        }),
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    app.listen(parseInt(process.env.PORT), () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/`);
    });
};

main();