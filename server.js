const express = require("express")
const app = express()
const port = process.env.PORT || 3500
const authMiddleware = require("./middleware/verifyJWT")

app.use(express.json())

app.use("/",require("./routes/root"))

app.use("/auth",require("./routes/auth"))

app.use(authMiddleware)

app.use("/products",require("./routes/product"))

app.use("/sell",require("./routes/sell"))

app.get("/thank-you",(req,res) => {
    console.log("Thank you for buying a product")
})

app.listen(port, () => { console.log("server running on port " + port) })
