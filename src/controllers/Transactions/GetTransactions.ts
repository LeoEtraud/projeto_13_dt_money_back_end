// src/controllers/Transactions/GetTransactions.ts
import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { Prisma } from "@prisma/client";

export class GetTransaction {
  async get(request: Request, response: Response) {
    try {
      // extrai 'q' e 'page' da query string
      const { q, page } = request.query as {
        q?: string;
        page?: string;
      };

      const pageNumber = Number(page) >= 1 ? Number(page) : 1;
      const perPage = 20;

      // monta o filtro ou undefined
      const whereClause: Prisma.TransactionsWhereInput | undefined = q
        ? {
            OR: [
              {
                description: {
                  contains: q,
                  mode: Prisma.QueryMode.insensitive, // <- enum, não string
                },
              },
              {
                category: {
                  contains: q,
                  mode: Prisma.QueryMode.insensitive, // <- enum, não string
                },
              },
            ],
          }
        : undefined; // <- importante: undefined, não {}

      const transactions = await prismaClient.transactions.findMany({
        where: whereClause, // TransactionsWhereInput | undefined
        select: {
          description: true,
          price: true,
          category: true,
          type: true,
          createdAt: true,
        },
        take: perPage,
        skip: (pageNumber - 1) * perPage,
        orderBy: { createdAt: "desc" },
      });

      return response.status(200).json(transactions);
    } catch (error) {
      console.error("Erro ao listar transações:", error);
      return response.status(500).json({ error: "Erro ao listar transações" });
    }
  }
}
