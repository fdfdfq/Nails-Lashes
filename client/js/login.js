const API = "http://localhost:3000/api/auth/login";



async function login(){


    const loginValue = 
    document.getElementById("login").value;



    const passwordValue =
    document.getElementById("password").value;



    try {


        const response = await fetch(API, {


            method:"POST",


            headers:{


                "Content-Type":"application/json"


            },


            body:JSON.stringify({


                login: loginValue,


                password: passwordValue


            })


        });



        const data = await response.json();



        if(data.success){



            // сохраняем настоящего пользователя

            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );



            window.location.href="admin.html";



        }

        else {


            document.getElementById("error").innerText =
            data.message;


        }



    } catch(error){


        console.log(error);


        document.getElementById("error").innerText =
        "Ошибка соединения с сервером";


    }


}