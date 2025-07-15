import { Router } from "express";
import { CreateTransaction } from "../controllers/Transactions/CreateTransaction";
import { GetTransaction } from "../controllers/Transactions/GetTransactions";

const transactionsRoutes = Router();

// ROTA DE CRIAÇÃO DE TRANSAÇÃO
const createTransactions = new CreateTransaction();
transactionsRoutes.post("/transactions", createTransactions.create);

// ROTA DE LISTAGEM DE TRANSAÇÃO
const getTransactions = new GetTransaction();
transactionsRoutes.get("/transactions", getTransactions.get);

export { transactionsRoutes };
