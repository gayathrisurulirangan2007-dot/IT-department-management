const express = require("express");
const path = require("path");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT=process.env.PORT||3000;

// ===============================
// SUPABASE
// ===============================

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("SUPABASE_URL or SUPABASE_KEY is missing");
    process.exit(1);
}

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

// ===============================
// DATABASE STATUS
// ===============================

app.get("/api/database-status", async (req, res) => {
    try {
        const { error } = await supabase
            .from("students")
            .select("id")
            .limit(1);

        if (error) {
            return res.status(500).json({
                connected: false,
                message: error.message
            });
        }

        res.json({
            connected: true,
            message: "Connected to Database"
        });

    } catch (error) {
        res.status(500).json({
            connected: false,
            message: error.message
        });
    }
});

// ===============================
// STUDENTS
// ===============================

app.get("/api/students", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("students")
            .select("*")
            .order("id", { ascending: false });

        if (error) throw error;

        res.json(data || []);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post("/api/students", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("students")
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;

        res.json({
            success: true,
            data: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.delete("/api/students/:id", async (req, res) => {
    try {
        const { error } = await supabase
            .from("students")
            .delete()
            .eq("id", req.params.id);

        if (error) throw error;

        res.json({
            success: true
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ===============================
// FACULTY / STAFF
// TABLE: faculty_staff
// ===============================

app.get("/api/faculty", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("faculty_staff")
            .select("*")
            .order("id", { ascending: false });

        if (error) throw error;

        res.json(data || []);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post("/api/faculty", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("faculty_staff")
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;

        res.json({
            success: true,
            data: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.delete("/api/faculty/:id", async (req, res) => {
    try {
        const { error } = await supabase
            .from("faculty_staff")
            .delete()
            .eq("id", req.params.id);

        if (error) throw error;

        res.json({
            success: true
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ===============================
// STUDENT DAILY UPDATES
// TABLE: student_daily_updates
// ===============================

app.get("/api/daily-updates", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("student_daily_updates")
            .select("*")
            .order("id", { ascending: false });

        if (error) throw error;

        res.json(data || []);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post("/api/daily-updates", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("student_daily_updates")
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;

        res.json({
            success: true,
            data: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.delete("/api/daily-updates/:id", async (req, res) => {
    try {
        const { error } = await supabase
            .from("student_daily_updates")
            .delete()
            .eq("id", req.params.id);

        if (error) throw error;

        res.json({
            success: true
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ===============================
// FACULTY DAILY UPDATES
// TABLE: faculty_daily_updates
// ===============================

app.get("/api/faculty-daily-updates", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("faculty_daily_updates")
            .select("*")
            .order("id", { ascending: false });

        if (error) throw error;

        res.json(data || []);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post("/api/faculty-daily-updates", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("faculty_daily_updates")
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;

        res.json({
            success: true,
            data: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.delete("/api/faculty-daily-updates/:id", async (req, res) => {
    try {
        const { error } = await supabase
            .from("faculty_daily_updates")
            .delete()
            .eq("id", req.params.id);

        if (error) throw error;

        res.json({
            success: true
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ===============================
// ANNOUNCEMENTS
// TABLE: announcements
// ===============================

app.get("/api/announcements", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("announcements")
            .select("*")
            .order("id", { ascending: false });

        if (error) throw error;

        res.json(data || []);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post("/api/announcements", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("announcements")
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;

        res.json({
            success: true,
            data: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.delete("/api/announcements/:id", async (req, res) => {
    try {
        const { error } = await supabase
            .from("announcements")
            .delete()
            .eq("id", req.params.id);

        if (error) throw error;

        res.json({
            success: true
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ===============================
// HISTORY
// TABLE: update_history
// ===============================

app.get("/api/history", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("update_history")
            .select("*")
            .order("id", { ascending: false });

        if (error) throw error;

        res.json(data || []);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post("/api/history", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("update_history")
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;

        res.json({
            success: true,
            data: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.delete("/api/history/:id", async (req, res) => {
    try {
        const { error } = await supabase
            .from("update_history")
            .delete()
            .eq("id", req.params.id);

        if (error) throw error;

        res.json({
            success: true
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ===============================
// WEBSITE
// ===============================

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "index.html")
    );
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log("======================================");
    console.log("IT Department Management System");
    console.log("Server running on port " + PORT);
    console.log("======================================");

});