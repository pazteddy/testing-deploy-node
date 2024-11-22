import express from "express";
import cookieParser from "cookie-parser";
import sessionHandler from "./middlewares/session";
import authRouter from "./routers/auth-router";
import userRouter from "./routers/user-router";
import errorHandler from "./middlewares/error";
import { authenticateHandler } from "./middlewares/authenticate";
import { authorize } from "./middlewares/authorize";

const app = express();
const port = 5500;

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(sessionHandler());

// Routers
app.use(authRouter);
app.use("/user", userRouter);
// Solo los usuarios con el rol "admin" pueden acceder a esta ruta
app.get("/admin", authenticateHandler, authorize("admin"), (_req, res) => {
  res.json({ ok: true, message: "Bienvenido al panel de administración" });
});

// Error
app.use(errorHandler);

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
