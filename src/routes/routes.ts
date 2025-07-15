import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { transactionsRoutes } from "./transactionsRoutes";

export const router = Router();

//User
router.use(userRoutes);
router.use(transactionsRoutes);
