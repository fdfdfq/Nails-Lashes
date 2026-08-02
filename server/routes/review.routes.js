const express = require("express");
const router = express.Router();

const pool = require("../config/database");


// ==========================
// Получить все одобренные отзывы
// ==========================

router.get("/", async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT *
            FROM reviews
            WHERE approved = true
            ORDER BY id DESC
        `);

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Ошибка загрузки отзывов"
        });

    }

});

module.exports = router;