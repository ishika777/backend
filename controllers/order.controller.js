const Order = require('../models/order.model.js');
const Product = require('../models/product.model.js');
const User = require("../models/user.model.js");

// Create a new order
module.exports.createOrder = async (req, res) => {
    try {
        const { product, paymentMethod } = req.body;
        const buyerId = req.id
        if (!product || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Product and payment method are required"
            });
        }
        if (!['cod', 'online'].includes(paymentMethod)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment method"
            });
        }

        // Check if buyer exists    
        const buyer = await User.findById(buyerId);
        if (!buyer) {
            return res.status(404).json({
                success: false,
                message: "Buyer not found"
            });
        }

        // Check if product exists and is not sold
        const foundProduct = await Product.findById(product);
        if (!foundProduct || foundProduct.isSold) {
            return res.status(400).json({
                success: false,
                message: 'Product is not available'
            });
        }

        const order = new Order({
            buyer: buyerId,
            product,
            paymentMethod
        });

        await order.save();

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get all orders by the logged-in buyer
module.exports.getBuyerOrders = async (req, res) => {
    try {
        const buyerId = req.id
        const buyer = await User.findById(buyerId);
        if (!buyer) {
            return res.status(404).json({
                success: false,
                message: "Buyer not found"
            });
        }

        // Fetch orders for the buyer and populate product details
        const orders = await Order.find({ buyer: buyerId }).populate('product');

        res.status(200).json({
            success: true,
            orders
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

