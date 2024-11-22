import { Router } from "express";
import { getusers,addUser,updateUser,deleteUser } from "../controllers/userController";

const router= Router();
router.get('/',getusers);
router.post('/',addUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

export default router;