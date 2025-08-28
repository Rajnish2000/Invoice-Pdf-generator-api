import express from "express";
import cors from "cors";
import UserRoutes from "./routes/user.routes.js";
import InvoiceRoutes from "./routes/invoice.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", UserRoutes);
app.use("/api/invoice", InvoiceRoutes);

export default app;
