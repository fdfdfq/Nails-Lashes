const db = require("../config/database");



exports.login = async (req, res) => {


    const { login, password } = req.body;



    try {


        const result = await db.query(
            `
            SELECT 
                id,
                name,
                login,
                role,
                master_id
            FROM admins
            WHERE login = $1
            AND password = $2
            `,
            [
                login,
                password
            ]
        );



        if(result.rows.length === 0){


            return res.json({

                success:false,

                message:"Неверный логин или пароль"

            });


        }




        const admin = result.rows[0];




        res.json({

            success:true,

            message:"Вход выполнен",

            admin:admin

        });



    } catch(error){


        console.log(error);


        res.status(500).json({

            success:false,

            message:"Ошибка сервера"

        });


    }



};