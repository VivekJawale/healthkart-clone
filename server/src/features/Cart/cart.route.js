const express = require("express");
const Cart = require("./cart.model");
const User = require("../auth/auth.model");
const Product = require("../Product/product.model");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY

const app = express.Router();

const authMiddleWare = async (req, res, next) => {
    const { token } = req.headers;
    try {
        if (!token) {
            return res.send("Token missing");
        } else {
            let decode = jwt.verify(token, SECRET_KEY);
            let user = await User.findOne({ phoneNumber: decode.phoneNumber });
            if (!user) {
                return res.send("User doesn't exist");
            } else {
                req._id = user._id;
                next();
            }
        }
    } catch (e) {
        return res.send(e.message);
    }
};

app.use(authMiddleWare);

app.get("", async (req, res) => {
    try {
        let cart = await Cart.find({ user: req._id }).populate(["user", "product"]);
        return res.send(cart);
    } catch (e) {
        return res.send(e.message);
    }
});

app.post("/:id", async (req, res) => {
    const { quantity, type } = req.body;
    const productID = req.params.id;
    try {
        let product = await Product.findById({ _id: productID });
        let cartItem = await Cart.findOne({ user: req._id, product: productID });
        if (!cartItem) {
            if (Check(product.quantity, quantity)) {
                return res.send({
                    message: `Database hav only ${product.quantity} quantity left`,
                });
            } else {
                let cart = await Cart.create({
                    product: productID,
                    user: req._id,
                    quantity: quantity,
                });
                await Product.findByIdAndUpdate(
                    { _id: productID },
                    { $inc: { quantity: -1 } }
                );
                return res.send(cart);
            }
        } else {
            if (!type) {
                return res.send("Type is missing");
            } else if (type === "asc") {
                if (Check(product.quantity, quantity)) {
                    return res.send({
                        message: `Database hav only ${product.quantity} quantity left`,
                    });
                } else {
                    let cart = await Cart.findOneAndUpdate(
                        {
                            product: productID,
                        },
                        {
                            $inc: { quantity: 1 },
                        }
                    );
                    await Product.findByIdAndUpdate(
                        { _id: productID },
                        { $inc: { quantity: -1 } }
                    );
                    return res.send("Updated");
                }
            } else if (type === "desc") {
                if (cartItem.quantity == 1) {
                    await Product.findByIdAndUpdate(
                        { _id: product._id },
                        {
                            $inc: { quantity: cartItem.quantity },
                        }
                    );
                    await Cart.findOneAndDelete({ _id: cartItem._id });
                    return res.send("Deleted Successfully by minus");
                } else {
                    let cart = await Cart.findOneAndUpdate(
                        {
                            product: productID,
                        },
                        {
                            $inc: { quantity: -1 },
                        }
                    );
                    await Product.findByIdAndUpdate(
                        { _id: productID },
                        { $inc: { quantity: 1 } }
                    );
                    return res.send(cart);
                }
            }
        }
    } catch (e) {
        return res.send(e.message);
    }
});

function Check(productQunatity, comingQuantity) {
    if (productQunatity < comingQuantity) {
        return true;
    } else {
        return false;
    }
}

app.delete("/:id", async (req, res) => {
    try {
        let cart = await Cart.findById({ _id: req.params.id });
        let product = await Product.findByIdAndUpdate(
            { _id: cart.product },
            {
                $inc: { quantity: cart.quantity },
            }
        );
        await Cart.findByIdAndDelete({ _id: cart._id });
        return res.send(product);
    } catch (e) {
        return res.send(e.message);
    }
});

module.exports = app;
