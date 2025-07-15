import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateUser {
  async create(request: Request, response: Response) {
    try {
      const { description, price, category, type, createdAt } = request.body;

      // Validação básica (opcional, mas recomendado)
      if (!description) {
        return response
          .status(400)
          .json({ error: "ID e description são obrigatórios" });
      }

      const user = await prismaClient.users.create({
        data: {
          description,
          price,
          category,
          type,
          createdAt,
        },
      });

      return response.status(201).json({
        message: "Usuário criado com sucesso!",
        user,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao criar usuário" });
    }
  }
}
