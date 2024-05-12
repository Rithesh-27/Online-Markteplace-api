const db = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const saltRounds = 10

const handleNewUser = async(req,res) => {
    const {username,email,password} = req.body

    try {
        const existingUser = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email])
        if (existingUser[0].length > 1) {
            return res.status(400).json({error: "Username already exists"})
        }

        const hashedPwd = await bcrypt.hash(password,saltRounds)
        
        await db.query('INSERT INTO users (username,email,password) VALUES (?,?,?)',[username,email,hashedPwd])

        return res.status(201).json({message: "User registered successfully"})
    } catch (error) {
        res.status(500).json({error: "Error registering user"})
    }
}

const handleLogin = async(req,res) => {
    const {username,password} = req.body

    try {
        const user = await db.query('SELECT * FROM users WHERE username = ?',[username])
        console.log(user[0][0].password)
        if (user[0].length == 0) {
            return res.status(401).json({error: "Invalid username"})
        }

        const match = await bcrypt.compare(password,user[0][0].password)
        if (!match) {
            return res.status(401).json({error: "Invalid password"})
        }

        const token = jwt.sign(user[0][0],process.env.JWT_SECRET,{expiresIn: '1h'})
        res.json({message: "Login successful", user: user[0],token: token})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Error logging in"})
    }
}

module.exports =  {handleNewUser,handleLogin}