import { Product } from "../models/invoice.models.js";
import generateInvoicePDF from "../utils/generateInvoicePDF.js";

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    console.log(product);
    if (!product) {
      return res
        .status(400)
        .json({ message: "data not found! ,no product added." });
    }

    const newProduct = await Product.create({
      user: req.userId,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });

    return res
      .status(201)
      .json({ message: "Product added created", newProduct });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error in adding product", error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ products });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting product", error: err.message });
  }
};

const downloadPDF = async (req, res) => {
  try {
    const products = await Product.find({
      user: req.userId,
    }).populate("user");

    if (!products)
      return res.status(404).json({ message: "Products not found" });
    console.log(products);
    const pdfBuffer = await generateInvoicePDF(products);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${products[0]._id}.pdf`,
    });

    return res.send(pdfBuffer);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error generating PDF", error: err.message });
  }
};

export { addProduct, getAllProducts, downloadPDF, deleteProductById };
