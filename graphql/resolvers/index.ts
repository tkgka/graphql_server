const Content = require('../../DB/contents');
const Account = require('../../DB/account');
import get_cache from "../../cache/get_data"
import set_cache from "../../cache/set_data"
import jwt from "jsonwebtoken";
import fs from 'fs';
import { startSession } from "mongoose";
import { AuthenticationError } from "apollo-server";
const secret_key = fs.readFileSync('ssh/jwtRS256.key', "utf-8");
const public_key = fs.readFileSync('ssh/jwtRS256.key.pub', "utf-8");
const resolvers = {
    Query: {
        async authenticate(_parent, args) {
            try {
                const account = new Account({
                    ...args.contentInput
                });
                const payload = { 'user_id': account.username };
                const find: string = await Account.find({ username: { $in: account.username }, password: { $in: account.password } });
                console.log(find)
                if (find.length > 0) {
                    const token = jwt.sign(payload, secret_key, { algorithm: 'RS256', expiresIn: '1h' });
                    return token
                } else {
                    return "not found"
                }
            } catch (err) {
                return "error";
            }


        },
        async getContents(_, _args, { req }) {
            const token = req.headers.authorization
            if (!token)
                throw new AuthenticationError("mssing token");
            else {
                jwt.verify(token, public_key, { algorithm: 'RS256' }, function (_err, decoded) {
                    if (decoded != undefined) {
                        return Content.find();
                    }

                });
            }
        },
        async findContent(_, args, { req }) {
            const token = req.headers.authorization
            if (!token)
                throw new AuthenticationError("mssing token");
            else {
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
            }
        },
        async find_24h_Content(_, args, { req }) {
            const token = req.headers.authorization
            if (!token)
                throw new AuthenticationError("mssing token");
            else {
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
            }
        },
        async createContent(_, _args, { req }) {
            const user_IP = req.headers['x-real-ip'] || req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
            const session = await startSession();
            try {
                session.startTransaction();
                const result: string[] = [];
                const content = new Content({
                    Client: user_IP,
                    ServerURL: req.headers['referer'],
                })
                result.push(await content.save({ session }))
                await get_cache(user_IP).then(async (val) => {
                    if (val == "") {
                        await session.commitTransaction()
                        set_cache(user_IP, new Date()).then((val) => { console.log("cached", val) })
                    } else {
                        console.log(val)
                    }
                })
                return result;
            } catch (err) {
                await session.abortTransaction();
                throw err;
            } finally {
                await session.endSession();
            }
        }
    },
    Mutation: {
        async createContent(_, args, { req }) {
            const user_IP = req.headers['x-real-ip'] || req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
            const session = await startSession();
            try {
                session.startTransaction();
                const content = new Content({
                    ...args.contentInput
                })
                content.Client = user_IP
                const result: string[] = [];
                result.push(await content.save({ session }))
                await get_cache(user_IP).then(async (val) => {
                    if (val == "") {
                        await session.commitTransaction()
                        set_cache(user_IP, new Date()).then((val) => { console.log("cached", val) })
                    } else {
                        console.log(val)
                    }
                })
                return result;
            } catch (err) {
                await session.abortTransaction();
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
        UserAgentData(_) {
            return _.UserAgentData;
        },
        createdAt(_) {
            return _.createdAt;
        },
    },

}



module.exports = resolvers;