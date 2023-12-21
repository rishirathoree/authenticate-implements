import { Router } from "express";
import { CreateUser, MessageForUsers, checkToken, login } from "../Controllers/User.js";

const router = Router();

router.post('/', CreateUser)
.post('/login',login)
.get('/',checkToken,MessageForUsers)

export default router;
