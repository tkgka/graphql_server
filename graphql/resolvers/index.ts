const Content = require('../../DB/contents');
import { startSession } from "mongoose";

const resolvers = {
    Query: {
        async getContents(_) {
            return await Content.find();
        },
        async findContent(_, args) {
            try {
                const content = new Content({
                    ...args.contentInput
                });
                const find: string = await Content.find({ ServerURL: { $in: content.ServerURL } })
                return find
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        async find_24h_Content(_, args) {
            try {
                const content = new Content({
                    ...args.contentInput
                });

                var timestamp = + new Date() - 86400000;
                const find: string = await Content.find({ ServerURL: { $in: content.ServerURL }, createdAt: { '$gte': timestamp } })
                return find
            } catch (err) {
                console.log(err)
                throw err
            }
        },
    },
    Mutation: {
        async createContent(_, args) {
            const session = await startSession();
            try {
                session.startTransaction();
                const content = new Content({
                    ...args.contentInput
                })
                const result: string[] = [];
                result.push(await content.save({ session }))

                await session.commitTransaction();
                return result;
            } catch (err) {
                await session.abortTransaction();
                console.log(err);
                throw err;
            } finally {
                await session.endSession();
            }
        },
    },
    Content: {
        ServerURL(_) {
            return _.ServerURL;
        },
        Client(_) {
            return _.Client;
        },
        createdAt(_) {
            return _.createdAt;
        },
    },

}



module.exports = resolvers;