import { Request,Response } from "express";
import prisma from "../prisma";

export const getusers= async(req:Request,res:Response)=>{
    try{
        const users= await prisma.user.findMany({
            include:{role:true}
        });
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json(error);
    }
}
export const addUser= async(req:Request, res:Response)=>{
    try{
        const {name,email,password,roleId}=req.body
        const newUser=await prisma.user.create({
            data: {name,email,password,roleId}
        })
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(500).json(error);
    }
}
export const updateUser= async(req:Request, res:Response)=>{
    try{
        const {id}= req.params;
        const {name,email,password}=req.body
        const updateUser=await prisma.user.update({
            where:{id:Number(id)},
            data: {name,email,password}
        })
        res.status(201).json(updateUser);
    }
    catch(error){
        res.status(500).json(error);
    }
}
export const deleteUser= async(req:Request,res:Response)=>{
    try{
        const {id}= req.params;
        await prisma.user.delete({where:{id:Number(id)}});
        res.status(204).send();
        
    }
    catch(error){
        res.status(500).json(error);
    }
}
