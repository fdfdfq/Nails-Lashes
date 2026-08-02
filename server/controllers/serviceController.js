const Service = require("../models/Service");

// Получить все услуги или услуги конкретного мастера
const getAllServices = async (req, res) => {

    try {

        const { master_id } = req.query;

        let services;

        if (master_id) {

            services = await Service.getByMaster(master_id);

        } else {

            services = await Service.getAll();

        }

        res.json(services);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Ошибка сервера"
        });

    }

};

// Получить услугу по ID
const getServiceById = async (req, res) => {

    try {

        const service = await Service.getById(req.params.id);

        if (!service) {

            return res.status(404).json({
                success: false,
                message: "Услуга не найдена"
            });

        }

        res.json(service);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Ошибка сервера"
        });

    }

};

module.exports = {
    getAllServices,
    getServiceById
};