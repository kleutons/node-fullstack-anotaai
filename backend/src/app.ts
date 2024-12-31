import express from "express"
import cors from 'cors';
import router from "./routes/routes";

export default function createApp(){
    const app = express();

    //Use Cors
    app.use(cors())
    
    //Middleware JSON
    app.use(express.json());

    // Define routes using the centralized router 
    app.use(router);


    return app;
}