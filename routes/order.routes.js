const express = require('express');
const router = express.Router();
const { createOrder, getBuyerOrders} = require('../controllers/order.controller');
const { isAuthenticated } = require("../middlewares/isAuthenticated")

router.route("/").post(isAuthenticated, createOrder)

router.route("/").get(isAuthenticated, getBuyerOrders)


module.exports = router;
