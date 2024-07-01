import mongoose from "mongoose";
import { connected } from "process";


export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('MONGODB connected');
               
        })
        connection.on('error', (err) => {
            console.log('MONGODB conection error, please make sure db is running' + err)
            process.exit();

        })
    } catch (error){
        console.log('something went wrong in DB');
        console.log(error)
    }
}