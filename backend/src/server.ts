import createApp from "./app";
import { middlewares } from "./middlewares/middlewares";

const port = process.env.PORT || 3000;


const start = async () =>{
    
    try{
        const app = createApp();

        // HOME ROUTER
        app.get("/", (req, res) => {
            res.status(200).json({message: 'Server started'});
        });

        app.listen(port, () => {
            console.log("🔥 Server Started, http://localhost:" + port);
        });

        // Apply middlewares
        middlewares(app)
    
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

start();
  