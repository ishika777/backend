const express = require("express")
const router = express.Router()

const { addProduct, getSellerProducts, markAsSold } = require("../controllers/seller.controller")

const { isAuthenticated } = require("../middlewares/isAuthenticated")

router.route("/products").post(isAuthenticated, addProduct)

router.route("/products").get(isAuthenticated, getSellerProducts)

router.route("/products/:id").patch(isAuthenticated, markAsSold)








module.exports = router