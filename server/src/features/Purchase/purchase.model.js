const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
    {
        name: String,
        orderCategory: String,
        userid: String
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = Purchase = mongoose.model("purchase", purchaseSchema);