import { Router } from "express";
import ChatController from "../controllers/chat.controller";

const router = Router();

router.get("/:user1/:user2", ChatController.getMessages);

export default router;
