import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateTransaction {
  async create(request: Request, response: Response) {
    try {
      const { description, price, category, type, createdAt } = request.body;

      // Validação básica (opcional, mas recomendado)
      if (!description) {
        return response
          .status(400)
          .json({ error: "Description são obrigatórios" });
      }

      const createTransaction = await prismaClient.transactions.create({
        data: {
          description,
          price,
          category,
          type,
          createdAt,
        },
      });

      return response.status(201).json({
        message: "Transação criada com sucesso!",
        createTransaction,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao criar transação" });
    }
  }
}
