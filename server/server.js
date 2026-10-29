const express = require("express");
const axios = require("axios");
const multer = require("multer");

const app  = express();
app.use(express.json());

const upload = multer({
    dest: "uploads/",
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, callback) => {
        if (file.originalname.toLowerCase().endsWith(".csv")) {
            callback(null, true);
        } else {
            callback(new Error("Only CSV files are allowed."));
        }
    }
});

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Loan Default Prediction Backend is running!");
});


app.post("/api/predict", async (req, res) => {
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/predict",
            req.body
        );

        res.json(response.data);
    } catch (error) {
        console.error("Prediction error:", error.message);

        res.status(500).json({
            error: "Unable to get a prediction from the ML service."
        });
    }
});


app.listen(PORT, () =>{
    console.log(`express server running at http://localhost:${PORT}`);
});