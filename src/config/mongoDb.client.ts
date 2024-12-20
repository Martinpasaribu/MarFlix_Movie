import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;


// Publish

export async function connectToDatabase(): Promise<void> {
    if (isConnected) {
        return;
    }

    const url: string = process.env.MongoDB_cloud2 || "";
    console.log("Connecting to MongoDB with URL:", url);

    try {
        await mongoose.connect(url);
        isConnected = true;
        console.log("MongoDB connected successfully with mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}





// Local 

// export async function connectToDatabase(): Promise<void> {
//     if (isConnected) {
//         return;
//     }

//     const url: string = process.env.MongoDB_Local || '';
//     const dbName = "MarFlix_Movie";
//     const fullUrl = `${url}/${dbName}`;

//     try {
//         await mongoose.connect(fullUrl);
//         isConnected = true;
//         console.log("MongoDB connected successfully with mongoose");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         throw error;
//     }
// }
