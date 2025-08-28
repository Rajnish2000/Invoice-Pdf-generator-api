import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  addProduct,
  downloadPDF,
  getAllProducts,
  deleteProductById,
} from "../controllers/invoice.controller.js";
const router = express.Router();

router.post("/product/add", authMiddleware, addProduct);
router.get("/product/list", authMiddleware, getAllProducts);
router.delete("/product/delete/:id", authMiddleware, deleteProductById);
router.get("/download", authMiddleware, downloadPDF);
export default router;
