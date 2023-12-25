import mongoose from 'mongoose';

class Database {
    private static instance: Database;

    private constructor() {
        this._connect();
    }

    private async _connect() {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async disconnect() {
        try {
            await mongoose.disconnect();
            console.log('Disconnected from MongoDB');
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
            throw error;
        }
    }
}

export default Database;