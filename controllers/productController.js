const db = require("../db")

const getAllProducts = async (req,res) => {
    try {
        const allProducts = await db.query('SELECT * FROM products')
        if (allProducts[0].length == 0) {
            return res.status(401).json({message: "No products available"})
        }
        res.json(allProducts[0])
    } catch (error) {
        res.status(500).json({error: "Error fetching products"})
    }
}

const getProductById = async (req,res) => {
    const pid = req.params.id

    try {
        const product = await db.query('SELECT * FROM PRODUCT WHERE product_id = ?',[pid])
        if (product.length == 0){
            return res.status(400).json({error: "Product not found"})
        }

        res.json(product[0])
    } catch(error) {
        res.status(500).json({error: "Error fetching product"})
    }
}

const buyProductById = async (req,res) => {
    const pid = req.params.id

    try {
        const product = await db.query('SELECT * FROM PRODUCT WHERE product_id = ?',[pid])
        if (product.length == 0){
            return res.status(400).json({error: "Product not found"})
        }

        if (product.quantity < 0){
            return res.status(400).json({error: "Product out of stock"})
        }

        await db.query('UPDATE products SET quantity = ? WHERE id = ?',[product[0].quantity - 1,pid])

        res.redirect('/thank-you')
    } catch(error) {
        return res.status(500).json({error: "Error buying products"})
    }
}

module.exports =  {getAllProducts,getProductById,buyProductById}