const express = require("express")
const router = express.Router()
const sellerController = require("../controllers/sellerController")
const authMiddleware = require("../middleware/verifyJWT")

router.get("/:id",authMiddleware,sellerController.getItemsSoldByUser)
router.post("/:id",authMiddleware,sellerController.addItemToSell)
router.put("/:id",authMiddleware,sellerController.updateItem)
router.delete("/:id",authMiddleware,sellerController.deleteItem)

module.exports = router