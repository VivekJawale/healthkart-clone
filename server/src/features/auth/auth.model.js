const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {


        name: String,
        email: { type: String },
        password: String,
        phoneNumber: { type: Number },
        gender: { type: String, enum: ["Male", "Female", "Others"] },
        role: {
            type: String,
            enum: ["Admin", "ProductManager", "Guest"],
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = User = mongoose.model("user", userSchema);
