const db = require("../config/database");


// ==========================
// Добавить мастера
// ==========================

const createMaster = async (req, res) => {

    try {

        const {
            name,
            profession,
            phone,
            telegram,
            city
        } = req.body;


        const result = await db.query(
            `
            INSERT INTO masters
            (
                name,
                profession,
                phone,
                telegram,
                city
            )
            VALUES
            ($1,$2,$3,$4,$5)
            RETURNING *
            `,
            [
                name,
                profession,
                phone,
                telegram,
                city
            ]
        );


        res.status(201).json(result.rows[0]);


    } catch(error){

        console.error(error);

        res.status(500).json({
            message:"Ошибка сервера"
        });

    }

};



// ==========================
// Удалить мастера
// ==========================

const deleteMaster = async (req,res)=>{

    try{


        await db.query(
            `
            DELETE FROM masters
            WHERE id=$1
            `,
            [
                req.params.id
            ]
        );


        res.json({
            success:true
        });


    }catch(error){

        console.error(error);

        res.status(500).json({
            message:"Ошибка сервера"
        });

    }

};




// ==========================
// Создать аккаунт мастера
// ==========================

const createAccount = async(req,res)=>{

    try{

        const {
            name,
            login,
            password,
            master_id
        } = req.body;



        const result = await db.query(
            `
            INSERT INTO admins
            (
                name,
                login,
                password,
                role,
                master_id
            )
            VALUES
            ($1,$2,$3,'master',$4)

            RETURNING *
            `,
            [
                name,
                login,
                password,
                master_id
            ]
        );


        res.status(201).json(result.rows[0]);


    }catch(error){

        console.error(error);


        res.status(500).json({
            message:"Ошибка сервера"
        });

    }

};




// ==========================
// Добавить услугу
// ==========================

const createService = async(req,res)=>{

    try{


        const {
            master_id,
            name,
            price,
            duration
        } = req.body;



        const result = await db.query(
            `
            INSERT INTO services
            (
                master_id,
                name,
                price,
                duration
            )
            VALUES
            ($1,$2,$3,$4)

            RETURNING *
            `,
            [
                master_id,
                name,
                price,
                duration
            ]
        );


        res.status(201).json(result.rows[0]);



    }catch(error){

        console.error(error);

        res.status(500).json({
            message:"Ошибка сервера"
        });

    }

};




// ==========================
// Изменить услугу
// ==========================

const updateService = async(req,res)=>{

    try{


        const {
            name,
            price,
            duration,
            master_id
        } = req.body;



        const result = await db.query(
            `
            UPDATE services

            SET
            name=$1,
            price=$2,
            duration=$3,
            master_id=$4

            WHERE id=$5

            RETURNING *
            `,
            [
                name,
                price,
                duration,
                master_id,
                req.params.id
            ]
        );



        res.json(result.rows[0]);



    }catch(error){

        console.error(error);

        res.status(500).json({
            message:"Ошибка сервера"
        });

    }

};




// ==========================
// Удалить услугу
// ==========================

const deleteService = async(req,res)=>{

    try{


        await db.query(
            `
            DELETE FROM services
            WHERE id=$1
            `,
            [
                req.params.id
            ]
        );


        res.json({
            success:true
        });



    }catch(error){

        console.error(error);

        res.status(500).json({
            message:"Ошибка сервера"
        });

    }

};



module.exports = {

    createMaster,
    deleteMaster,

    createAccount,

    createService,
    updateService,
    deleteService

};