require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./src/configs/db");
const PORT = process.env.PORT || 8080;
const userRoute = require("./src/features/auth/auth.route");
const productRoute = require("./src/features/Product/product.route");
const cartRoute = require("./src/features/Cart/cart.route");
const checkroleRoute = require("./src/features/checkRole/checkrole.route");
const purchaseRoute = require("./src/features/Purchase/purchase.route");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/utils/index.html");
});

const sendMail = ({ link }) => {
  return new Promise((resolve, reject) => {
    var transpoter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MYEMAIL,
        pass: process.env.MYPASS,
      },
    });

    const mailConfings = {
      from: process.env.MYEMAIL,
      to: ["sanghamitramymail@gmail.com", "ankitpatil2341@gmail.com","vivekjawale41@gmail.com"],
      subject: "Invitation from User",
      text: "User is Welcoming you to meet please click on below link to join",
      html: `
            <div style="background:;width:80%;height:700px;margin:auto;text-align:center;">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa_iXQ2w3PNNhANWkrY-I0cDpUnTRGpu6v0iE_GsAt&s"/>
            <h1>Click on below link to join</h6>
            <a target="_blank" href="${link}" style="width:100%;color:#3e64ff;font-size:30px">${link}</a>
                <img style="background:green;width:100%;height:500px;" src="https://i.postimg.cc/T20rg079/download-helthkart.jpg"/>
                        </div>
            `,
    };
    transpoter.sendMail(mailConfings, (err, info) => {
      if (err) {
        console.log(err);
        return reject({ msg: "error occured" });
      }
      return resolve({ msg: "email sent" });
    });
  });
};

app.post("/sendmail", async (req, res) => {
  sendMail(req.body)
    .then((response) => {
      res.send({ msg: "email sent" });
    })
    .catch((err) => {
      res.send({ msg: "error occured" });
    });
});

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/check", checkroleRoute);
app.use("/buy", purchaseRoute);

app.listen(PORT, async (req, res) => {
  try {
    await connect();
    console.log(`http://localhost:${PORT}`);
  } catch (error) {
    console.log(error.message);
    return res.send(error);
  }
});
