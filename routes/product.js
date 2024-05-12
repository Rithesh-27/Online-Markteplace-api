const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const authMiddleware = require("../middleware/verifyJWT")

router.get("/",authMiddleware,productController.getAllProducts)
router.get("/:id",authMiddleware,productController.getProductById)
router.put("/:id",authMiddleware,productController.buyProductById)

module.exports = router