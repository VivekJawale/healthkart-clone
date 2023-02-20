require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./src/configs/db");
const PORT = process.env.PORT || 8080;
const userRoute = require("./src/features/auth/auth.route");
const productRoute = require("./src/features/Product/product.route");
const cartRoute = require("./src/features/Cart/cart.route");
const checkroleRoute=require("./src/features/checkRole/checkrole.route")
const purchaseRoute=require("./src/features/Purchase/purchase.route");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/utils/index.html');
})

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/check",checkroleRoute);
app.use("/buy",purchaseRoute);




app.listen(PORT, async (req, res) => {
    try {
        await connect();
        console.log(`http://localhost:${PORT}`);
    } catch (error) {
        console.log(error.message);
        return res.send(error);

    }
});