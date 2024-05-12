const db = require("../db")

const getItemsSoldByUser = async (req, res) => {
  const userId = req.params.id 

  try {
    const items = await db.query('SELECT * FROM products WHERE seller_id = ?', [userId])
    res.json(items[0])
  } catch (error) {
    console.error('Error fetching items:', error)
    res.status(500).json({ error: 'Error fetching items' })
  }
}

// Add an item to sell
const addItemToSell = async (req, res) => {
  const { name, price, quantity } = req.body
  const userId = req.params.id

  try {
    await db.query('INSERT INTO products (name, price, quantity, seller_id) VALUES (?, ?, ?, ?)', [name, price, quantity, userId])
    res.status(201).json({ message: 'Item added to sell successfully' })
  } catch (error) {
    console.error('Error adding item:', error)
    res.status(500).json({ error: 'Error adding item' })
  }
}

const updateItem = async (req, res) => {
  const userId = req.params.id
  const { product_id,field, value } = req.body

  try {
    if (field == 'name') {
        await db.query('UPDATE products SET name = ? WHERE product_id = ? AND seller_id = ?',[value,product_id,userId])
    }
    else if (field == 'price') {
        await db.query('UPDATE products SET price = ? WHERE product_id = ? AND seller_id = ?', [value,product_id,userId])
    }
    else if (field == 'quantity') {
        await db.query('UPDATE products SET quantity = ? WHERE product_id = ? AND seller_id = ?', [value,product_id,userId])
    }
    res.json({ message: 'Item updated successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Error updating item' })
  }
}

const deleteItem = async (req, res) => {
  const userId = req.params.id
  const {product_id} = req.body

  try {
    await db.query('DELETE FROM products WHERE product_id = ? AND seller_id = ?', [product_id,userId])
    res.json({ message: 'Item deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting item' })
  }
}

module.exports = { getItemsSoldByUser, addItemToSell, updateItem, deleteItem };
