const Master = require("../models/Master");

// Получить всех мастеров
const getAllMasters = async (req, res) => {
    try {

        const masters = await Master.getAll();

        res.status(200).json(masters);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Помилка сервера"
        });

    }
};

// Получить мастера по ID
const getMasterById = async (req, res) => {

    try {

        const master = await Master.getById(req.params.id);

        if (!master) {

            return res.status(404).json({
                message: "Майстра не знайдено"
            });

        }

        res.status(200).json(master);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Помилка сервера"
        });

    }

};

module.exports = {
    getAllMasters,
    getMasterById
};