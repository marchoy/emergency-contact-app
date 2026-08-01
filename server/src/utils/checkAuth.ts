import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const checkAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    const adminPassword = process.env.ADMIN_PASSWORD?.trim();
    if (adminPassword) {
        const authHeader = context.req.headers.authorization?.trim();
        if (authHeader !== adminPassword) {
            throw new Error("Unauthorized: Invalid admin password.");
        }
    }
    return next();
};
