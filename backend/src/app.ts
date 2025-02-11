import express from "express"
import cors from 'cors';
import router from "./routes/routes";

const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';

if (!process.env.ALLOWED_ORIGIN) {
    console.warn('A variável ALLOWED_ORIGIN não está definida no arquivo .env');
}

export default function createApp(){
    const app = express();

    const corsOptions = {
        origin: allowedOrigin, // Permite requisições de qualquer origem
        methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
        allowedHeaders: 'Content-Type,Authorization' // Cabeçalhos permitidos
    };

    //Use Cors
    app.use(cors(corsOptions))
    
    //Middleware JSON
    app.use(express.json());

    // Define routes using the centralized router 
    app.use(router);


    return app;
}