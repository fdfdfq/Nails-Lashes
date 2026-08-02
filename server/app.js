const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();


// ==========================
// Middleware
// ==========================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// Раздача статических файлов сайта
app.use(express.static(path.join(__dirname, "../client")));


// ==========================
// Routes
// ==========================

const bookingRoutes = require("./routes/booking.routes");
const authRoutes = require("./routes/auth.routes");
const masterRoutes = require("./routes/master.routes");
const serviceRoutes = require("./routes/service.routes");
const adminRoutes = require("./routes/admin.routes");
const reviewRoutes = require("./routes/review.routes");


// ==========================
// API
// ==========================

// Записи
app.use("/api/bookings", bookingRoutes);

// Авторизация
app.use("/api/auth", authRoutes);

// Мастера
app.use("/api/masters", masterRoutes);

// Услуги
app.use("/api/services", serviceRoutes);

// Отзывы
app.use("/api/reviews", reviewRoutes);

// Админка
app.use("/api/admin", adminRoutes);


// ==========================
// Главная страница сайта
// ==========================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "../client/index.html")
    );

});


// ==========================
// 404
// ==========================

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Маршрут не найден"
    });

});


// ==========================
// Запуск сервера
// ==========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`🚀 Server started on http://localhost:${PORT}`);

});