import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes/routes";

const app = express();

// Middlewares globais
app.use(express.json());
app.use(express.static("public"));

// CORS - Use o pacote oficial para maior flexibilidade e segurança
app.use(
  cors({
    origin: "*", // ou especifique as origens permitidas
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// Cache-Control
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  next();
});

// Rotas
app.use(router);

// Middleware de tratamento de erros (deve ficar por último)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }
  return res
    .status(500)
    .json({ status: "error", message: "Erro interno no servidor" });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}!`));
