const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, "department-data.json");

app.use(express.json());
app.use(express.static(__dirname));

function loadData() {
    if (!fs.existsSync(DATA_FILE)) {
        return {
            students: [],
            faculty: [],
            updates: [],
            announcements: [],
            history: []
        };
    }

    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/api/data", (req, res) => {
    res.json(loadData());
});

app.post("/api/data", (req, res) => {
    saveData(req.body);
    res.json({ success: true });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`IT Department server running on port ${PORT}`);
});