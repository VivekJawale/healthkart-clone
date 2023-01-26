const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: String,
        image: { type: String },
        price1: Number,
        price2: Number,
        discount: Number,
        quantity: Number,
        category: String,
        reviews: [{ user_name: String, title: String }],
        ratings: [],
        star_rating: Number,
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = Product = mongoose.model("product", productSchema);
