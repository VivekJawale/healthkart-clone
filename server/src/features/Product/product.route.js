const express = require("express");
const Product = require("./product.model");

const app = express.Router();

app.get("", async (req, res) => {
    const {
        page = 1,
        limit = 20,
        category,
        input,
        priceSort,
        discountSort,
        priceByCat,
        discountByCat,
    } = req.query;
    try {
        if (priceByCat && category) {
            let [min, max] = priceByCat.split(" - ").map(Number);
            let product = await Product.find({
                category,
                $and: [{ $gte: { price1: min } }, { $lt: { price1: max } }],
            }).limit(limit);
            return res.status(200).send(product);
        } else if (discountByCat && category) {
            let [min, max] = discountByCat.split(" - ").map(Number);
            let product = await Product.find({
                category,
                $and: [{ $gte: { discount: min } }, { $lt: { discount: max } }],
            }).limit(limit);
            return res.status(200).send(product);
        }
        if (priceSort && category) {
            if (priceSort === "asc") {
                let product = await Product.find({ category })
                    .sort({ price1: 1 })
                    .skip((page - 1) * limit)
                    .limit(limit);
                return res.status(200).send(product);
            } else if (priceSort === "desc") {
                let product = await Product.find({ category })
                    .sort({ price1: -1 })
                    .skip((page - 1) * limit)
                    .limit(limit);
                return res.status(200).send(product);
            }
        } else if (discountSort && category) {
            if (discountSort === "asc") {
                let product = await Product.find({ category })
                    .sort({ discount: 1 })
                    .skip((page - 1) * limit)
                    .limit(limit);
                return res.status(200).send(product);
            } else if (discountSort === "desc") {
                let product = await Product.find({ category })
                    .sort({ discount: -1 })
                    .skip((page - 1) * limit)
                    .limit(limit);
                return res.status(200).send(product);
            }
        } else if (input && category) {
            let temp = new RegExp(input, "i");
            let product = await Product.find({ name: temp, category }).limit(limit);
            return res.status(200).send(product);
        } else if (input) {
            let temp = new RegExp(input, "i");
            let product = await Product.find({ name: temp }).limit(limit);
            return res.status(200).send(product);
        } else if (category) {
            let product = await Product.find({ category })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send(product);
        } else {
            let product = await Product.find()
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send(product);
        }
    } catch (e) {
        return res.status(404).send(e.message);
    }
});

app.get("/:id", async (req, res) => {
    try {
        let product = await Product.findById({ _id: req.params.id });
        return res.status(200).send(product);
    } catch (e) {
        return res.status(400).send(e.message);
    }
});

app.patch("/:id", async (req, res) => {
    const {
        user_name,
        star,
        title,
        type,
        image,
        name,
        quantity,
        price1,
        price2,
        discount,
    } = req.body;
    try {
        if (!type) {
            let product = await Product.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    image,
                    name,
                    quantity,
                    price1,
                    price2,
                    discount,
                }
            );
            return res.send(product);
        } else if (type === "rating") {
            let product = await Product.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $push: { ratings: star },
                }
            );
            return res.status(201).send({
                product,
                message: "Product has been updated successfully",
            });
        } else if (type === "reviews") {
            let product = await Product.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $push: { reviews: { user_name, title } },
                }
            );
            return res.status(201).send({
                product,
                message: "Product has been updated successfully",
            });
        }
    } catch (e) {
        return res.status(500).send(e.message);
    }
});


app.delete("/:id",async(req,res)=>{
    try{
        let product = await Product.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).send({msg:"deleted"});
    }
    catch(err){
        console.log(err)
    }
})
module.exports = app;
