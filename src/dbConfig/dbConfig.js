import mongoose from 'mongoose';

let isConnected;

export async function ConnectToDB() {

    if(isConnected)
        return

    try{

        await mongoose.connect(process.env.MONGO_URI, {

            dbName: "MySocialMediaApp",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })

        isConnected = mongoose.connection.readyState;

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        mongoose.connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit(1);
        })

    } catch (error) {
        console.error('Something went wrong while connecting to MongoDB:', error);
        process.exit(1);
        
    }


}