import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user/user.service";
import { HttpStatusCodes } from "../errors/http-status-codes";
import { HttpError } from "../errors/http-error";
import { UserRole } from "@prisma/client";
import { UserDataReturn } from "../models/user.model";


const SECRET = process.env.SECRET || 'jwt-secret';

export default class AuthController {
    
    private service: UserService;

    constructor(){
        this.service = new UserService();
    }

    //LOGIN USER
    public async login(req:Request, res:Response){
        const {email, password}:{email:string, password:string}= req.body;

        try{
            const user = await this.service.findByEmail(email);
            
            if(!user){
                res.status(HttpStatusCodes.ERRO_UNAUTHORIZED)
                .json({error: "Not Authorized"})

                return;
            }

            const isValidPass = bcrypt.compareSync(password, user.password);

            if(!isValidPass){
                res.status(HttpStatusCodes.ERRO_UNAUTHORIZED)
                .json({error: "Not Authorized!"})
                return;
            }

            const token = jwt.sign({id: user.id, email: user.email, role: user.role}, SECRET, {expiresIn: '1h'});

            const userData: UserDataReturn = {
                id: user.id,
                name: user.name,
                storeId: user.storeId,
                email: user.email,
                role: user.role,
                status: user.status,
                imgUrl: user.imgUrl ?? undefined
            };

            if(user.imgUrl){
                userData.imgUrl = user.imgUrl;
            }

            res.json({
                    token,
                    user: userData
            });
            
        }catch(err){
            if(err instanceof HttpError)
                return res.status(err.statusCode).json({error: err.message})

            res.status(500).json({error:'Failed to Login' })
        }
        
    }

    // Check valid Token
    public verifyToken(req:Request, res:Response, next:NextFunction){

        const tokenHeader = req.headers['authorization'];
        const token = tokenHeader && tokenHeader.split(' ')[1];

        if(!token){
            res.status(HttpStatusCodes.ERRO_UNAUTHORIZED)
            .json({error: "Not Authorized!"})
            return;
        }

        jwt.verify(token, SECRET, (error: any, decoded:any) => {
            if(error){
                res.status(HttpStatusCodes.ERRO_UNAUTHORIZED)
                .json({error: "Invalid Token!"})
                return;
            }

            req.user = decoded as {
                id: string,
                email: string,
                role: UserRole
            };
            
            next();
            
        })

    }

    //check if user is administrator
    public isAdmin(req:Request, res:Response, next:NextFunction){
        if(req.user && req.user.role === UserRole.ADMIN){
            next();
            return;
        }

        res.status(HttpStatusCodes.ERRO_FORBIDDEN)
        .json({error: "Forbidden: You don't have the required permissions."})
        return;
    }

    // Validation to limit the use of the authenticated id itself in the token
    public ValidateGetIdUserToken(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        

        if (req.user && req.user.role === UserRole.ADMIN) {
            next();
            return
        }else
        if(req.user && req.user.id === id){
            next();
            return
        }

        res.status(HttpStatusCodes.ERRO_FORBIDDEN)
        .json({error: "Forbidden: You don't have the required permissions."});
        return;
    }
    
}