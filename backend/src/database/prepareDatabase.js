import { db } from "./prisma/prismaClient.js";

async function connectToDatabase() {
    try {
        await db.$connect();
        console.log("Connected to the database.");
    } catch (e) {
        console.error("Failed to connect to the database:", e);
        throw e;
    }
}

async function truncatePostTagTable() {
    try {
        await db.postTag.deleteMany({});
        console.log("Truncated post tag table.");
    } catch (e) {
        console.error("Failed to truncate post tag table:", e);
        throw e;
    }
}

async function truncatePostTable() {
    try {
        await db.post.deleteMany({});
        console.log("Truncated post table.");
    } catch (e) {
        console.error("Failed to truncate post table:", e);
        throw e;
    }
}

async function truncateUserTable() {
    try {
        await db.user.deleteMany({});
        console.log("Truncated user table.");
    } catch (e) {
        console.error("Failed to truncate user table:", e);
        throw e;
    }
}

async function truncateCommentTable() {
    try {
        await db.comment.deleteMany({});
        console.log("Truncated comment table.");
    } catch (e) {
        console.error("Failed to truncate comment table:", e);
        throw e;
    }
}

async function truncateTagTable() {
    try {
        await db.tag.deleteMany({});
        console.log("Truncated tag table.");
    } catch (e) {
        console.error("Failed to truncate tag table:", e);
        throw e;
    }
}

async function truncateUserFollowerTable() {
    try {
        await db.UserFollower.deleteMany({});
        console.log("Truncated UserFollower table.");
    } catch (e) {
        console.error("Failed to truncate UserFollower table:", e);
        throw e;
    }
}

export async function prepareDatabaseOperation() {
    await connectToDatabase();

    await truncatePostTagTable();
    await truncateTagTable();
    await truncateCommentTable();
    await truncatePostTable();
    await truncateUserFollowerTable();
    await truncateUserTable();
}
