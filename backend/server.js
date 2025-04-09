import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";


dotenv.config()

const app = express()
app.use(express.json())

app.get("/api/products", async(req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json({success: true, data:product})
    } catch (error) {
        console.log("error in fetching product:", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
})

app.post("/api/products", async(req, res) => {
    const product = req.body

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all fields"})
    }

    const newProducts = new Product(product)

    try {
       await newProducts.save()
       res.status(201).json({success: true, data: newProducts})
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({success:false, message:"Server Error"})
    }
})

app.put("/api/products/:id", async(req, res) => {
    const {id} = req.params
    const product = req.body

    //! id formatı geçerli olup olmadığını kontrol eder
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Invalid Product Id"})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true}) // new:true yeni veriyi döndürür.
        //! id formatı geçerli olabilir ama aynı id ye sahip veri olmayabilir.
        //! bu yüzde aynı id değeri yoksa ürüne erişilemeyecek
        if (!updatedProduct) {
            res.status(404).json({success: false, message:"Product not found"})
        }
        res.status(200).json({success:true, data:updatedProduct})
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"})
    }
})

app.delete("/api/products/:id", async(req, res) => {
    const {id} = req.params
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success: true, message:"Product deleted"})
    } catch (error) {
        console.log("error in deleting product:", error.message)
        res.status(404).json({success:false, message:"Product not found"})
    }
})

// console.log(process.env.MONGO_URI)

app.listen(5000, () => {
    connectDB()
    console.log("Server started at http://localhost:5000")
})
