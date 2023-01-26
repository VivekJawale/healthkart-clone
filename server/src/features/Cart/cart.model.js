const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user: {
            ref: "user",
            required: true,
            type: mongoose.Schema.Types.ObjectId,
        },
        product: {
            ref: "product",
            required: true,
            type: mongoose.Schema.Types.ObjectId,
        },
        quantity: Number,
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = Cart = mongoose.model("cart", cartSchema);
