import mongoose from 'mongoose';

export default class MongoManager {
    constructor(connectionString) {
        this.connectionString = connectionString;

        mongoose.connect(this.connectionString);
        mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    }
}