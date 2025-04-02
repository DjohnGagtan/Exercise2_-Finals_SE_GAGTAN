const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your-email@gmail.com",  // Replace with your email
        pass: "your-email-password"    // Replace with your app password
    }
});

// Send email route
app.post("/send-email", (req, res) => {
    const { email, code } = req.body;

    const mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: "Email Verification Code",
        text: `Your verification code is: ${code}`
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return res.json({ success: false, message: "Error sending email." });
        }
        res.json({ success: true });
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
