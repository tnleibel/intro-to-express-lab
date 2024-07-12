const express = require("express")
const app = express()
const PORT = 3000

app.get("/greetings/:userName", (req, res, next) => {
    res.send(`<h1>Salutations, ${req.params.userName}!<h1>`)
})

app.get("/roll/:number", (req, res, next) => {
    if(isNaN(req.params.number)) {
        res.send("You must specify a number.")
        return
    } else {
        res.send(`${Math.floor(Math.random() * req.params.number)}`)
    }
})

app.get("/collectibles/:collectibleIndex", (req, res, next) => {
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
      ];
    if(req.params.collectibleIndex >= collectibles.length) {
        res.send("This item is not yet in stock. Check back soon!")
    } else {
       res.send(`So, you want the ${collectibles[req.params.collectibleIndex].name}? It can be yours my friend, but only if you have ${collectibles[req.params.collectibleIndex].price} Dollars!`) 
    }
})

app.get("/shoes", (req, res, next) => {
    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ]
    const minPrice = req.query["min-price"]
    const maxPrice = req.query["max-price"]
    const type = req.query.type
    let filteredShoes = shoes.filter(shoe => {
        if(minPrice !== undefined && shoe.price < minPrice) {
            return false
        }
        if(maxPrice !== undefined && shoe.price > maxPrice) {
            return false
        }
        if(type !== undefined && shoe.type !== type) {
            return false
        } 
        return true
    })
    res.send(filteredShoes)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})