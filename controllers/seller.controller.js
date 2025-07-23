const Product = require('../models/product.model');

const User = require("../models/user.model.js");


module.exports.addProduct = async (req, res) => {
    try {
        const { height, width, material, rate, stock } = req.body;
        if(!height || !width || !material || !rate || !stock) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const userId = req.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const product = new Product({
            seller: userId,
            height,
            width,
            material,
            rate,
            stock
        });
        await product.save();
        res.status(201).json({ 
            success: true,
            message: 'Product added successfully',
            product
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};



module.exports.getSellerProducts = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const products = await Product.find({ seller: userId });

        res.status(200).json({ success: true, products });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

module.exports.markAsSold = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const product = await Product.findOneAndUpdate(
            { _id: productId },
            { isSold: true },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found or unauthorized' });
        }

        res.status(200).json({ success: true, message: 'Product marked as sold', product });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
